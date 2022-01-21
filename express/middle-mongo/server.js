import 'dotenv/config'
import express from "express";
import cors from 'cors'
import jwt from "jsonwebtoken";
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";
import bcrypt from 'bcrypt'

//CONFIG
const app = express();
const port = 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
  })
)
app.use(express.json());
app.use(cookieParser());


//HELPERS tb extracted
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '6000s'});
}

function authenticateToken(req, res, next) {
  const authHeader = req.cookies.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).send("Failed to authenticate");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send("INVALID TOKEN");;
    req.user = user; 
    next();
  }) 
}

//DB CONNECTION PAGES
const uri = "mongodb://localhost:27017/todo";

async function main() {
  await mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
  const connection = mongoose.connection;
  connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
  });

  const noteSchema = new mongoose.Schema({
    text: String,
    _id: String,
    isDone: Boolean,
    created: Number,
    author: String
  });
  const Note = mongoose.model('Note', noteSchema);

  const userSchema = new mongoose.Schema({
    login: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  });    
  const User = mongoose.model('User', userSchema);

  app.listen(port, function() {
    console.log("Server is running on Port: " + port);
  });
  

  // ===REGISTER AND LOGIN===
  app.post('/register', async (req, res) => {
    const login = req.body.login || null;
    const password = req.body.password || null;
    
    const passwordTemplate = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if (!login || !password) {
      res.status(400).send(`Missing login / password`);
      return
    }

    try {
      const hash = bcrypt.hashSync(password, 10);

      const newUser = new User({
        login: login,
        password: hash,
        isAdmin: false
        })
      await newUser.save();
      res.status(200).send(`Created user ${login}`)
    } catch(e) {
        res.status(418).send(`Invalid login / password`);
    }
  })

  app.post('/login', async (req, res) => {

    const login = req.body.login || null;
    const password = req.body.password || null;
  
    if (!login || !password) {
      res.status(400).send(`Missing login / password`);
      return
    }

    const dbUser = await User.findOne({ login: login });

    if (!dbUser) {
      res.status(400).send(`Invalid username`);
      return
    }

    const hash = dbUser.password;
    const isAdmin = dbUser.isAdmin;

    const match = bcrypt.compareSync(password, hash);
    if (!match) {
      res.status(403).send("Invalid login / password");
      return
    };
    
    const user = { login: login, isAdmin: isAdmin }
  
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    res.cookie('authorization', 'Bearer ' + accessToken, { httpOnly: true })
      .cookie('refreshToken', 'Bearer ' + refreshToken, { httpOnly: true })
      .status(200)
      .json({ message: "Logged in", isAdmin: isAdmin, login: login })
  })
  
  app.get('/checklogin', authenticateToken, async (req, res) => {
      const login = req.user.login;
      const dbUser = await User.findOne({ login: login });
      const isAdmin = dbUser.isAdmin;
      res.status(200).json({ message: "Logged in", isAdmin: isAdmin, login: login });
  })
  
  app.get('/logout', async (req, res) => {
    res.cookie('authorization', 'none', {
      expires: new Date(Date.now()),
      httpOnly: true,
  })
  res
      .status(200)
      .json({ success: true, message: 'User logged out successfully' })
  })


  // ===DATA ACCESS===
  app.get('/notes', authenticateToken, async (req, res) => {

    const login = req.user.login;

    const notes = await Note.find({ author: login });
    notes.sort((a,b) => {
      return b.created - a.created;
    })
    res.status(200).json(notes);
  })

  app.post('/notes', authenticateToken, async (req, res) => {

    const id = req.body._id;
    const text = req.body.text;
    const isDone = req.body.isDone;
    const created = req.body.created;
    const login = req.user.login;

    const newNote = new Note({
      text: text,
      _id: id,
      isDone: isDone,
      created: created,
      author: login
    })

    await newNote.save();
    res.json(newNote);
  })

  app.delete('/notes', authenticateToken, async (req, res) => {

    const idList = req.body;

    await idList.forEach( async (item) => {
      await Note.findByIdAndRemove(item);
    }) 
    res.send("Deleted");
  })

  app.patch('/notes/setdone', authenticateToken, async (req, res) => {

    const isDone = req.body.isDone;
    const update = await Note.updateMany({isDone: !isDone}, {isDone: isDone})

    res.send(`Updated ${update.modifiedCount} notes.`);
  })

  app.patch('/notes', authenticateToken, async (req, res) => {

    const _id = req.body._id;
    const key = req.body.key;
    const val = req.body.val;

    const patch = {[key]: val}

    const update = await Note.updateOne({_id: _id}, patch)

    res.send(`Updated ${update.modifiedCount} note.`);
  })

  // === ADMIN PANEL ===

  app.get('/users', authenticateToken, async (req, res) => {

    const login = req.user.login;
    const dbUser = await User.findOne({ login: login });
    const isAdmin = dbUser.isAdmin;

    if (!isAdmin) {
      res.status(403).send("Not an admin")
      return
    }

    const users = await User.find({});
    users.sort((a,b) => {
      return b.isAdmin - a.isAdmin;
    })
    res.json(users);
  })

  
  app.patch('/users', authenticateToken, async (req, res) => {

    const login = req.user.login;
    const dbUser = await User.findOne({ login: login });
    const isAdmin = dbUser.isAdmin;

    if (!isAdmin) {
      res.status(403).send("Not an admin")
      return
    }

    const changedUser = req.body.login;
    const newIsAdmin = req.body.newIsAdmin;

    if (login === changedUser) {
      res.status(403).send("Cannot revoke admin from self")
      return
    }

    const user = await User.findOneAndUpdate({login: changedUser}, {isAdmin: newIsAdmin});

    res.status(200).json({isAdmin: newIsAdmin});
  })


  app.get('/users/:login', authenticateToken, async (req, res) => {

    const login = req.user.login;
    const dbUser = await User.findOne({ login: login });
    const isAdmin = dbUser.isAdmin;

    if (!isAdmin) {
      res.status(403).send("Not an admin")
      return
    }

    const gotUser = req.params.login;

    const notes = await Note.find({ author: gotUser });
    notes.sort((a,b) => {
      return b.created - a.created;
    })
    res.status(200).json(notes);
  })

}

main();


