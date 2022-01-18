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
  console.log(req.headers.authorization);
  const authHeader = req.cookies.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; 
    next();
  }) 
  
}




//SERVER

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
    const login = req.body.login;
    const password = req.body.password;
    
    if (!login || !password) {
      res.status(400).send(`gdzie login/haslo`);
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
      console.log("DONE")
      res.status(200).send(`Created user ${login}`)
    } catch(e) {
      console.log("fuckup");
        res.status(418).send(`fuckup`);
    }
  })

  app.post('/login', async (req, res) => {
    const login = req.body.login;
    const password = req.body.password;
  
    if (!login || !password) {
      res.status(400).send(`gdzie login/haslo`);
      return
    }

    const dbUser = await User.findOne({ login: login });
    const hash = dbUser.password;

    const match = bcrypt.compareSync(password, hash);
    if (!match) {
      res.status(403).send("Invalid password");
      return
    };
    
    const user = { login: login }
  
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    res.cookie('authorization', 'Bearer ' + accessToken, { httpOnly: true })
      .cookie('refreshToken', 'Bearer ' + refreshToken, { httpOnly: true })
      .status(200)
      .json({ message: "Logged in" })
  })
  
  app.get('/checklogin', authenticateToken, async (req, res) => {
      res.status(200);
  })
  
  app.get('/logout', async (req, res) => {
    console.log(req.cookies);
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

    const notes = await Note.find();
    notes.sort((a,b) => {
      return b.created - a.created;
    })
    res.json(notes);
  })

  app.post('/notes', async (req, res) => {

    const id = req.body._id;
    const text = req.body.text;
    const isDone = req.body.isDone;
    const created = req.body.created;

    const newNote = new Note({
      text: text,
      _id: id,
      isDone: isDone,
      created: created
    })

    await newNote.save();
    res.json(newNote);
  })

  app.delete('/notes', async (req, res) => {

    const idList = req.body;

    await idList.forEach( async (item) => {
      await Note.findByIdAndRemove(item);
    }) 
    res.send("Deleted");
  })

  app.patch('/notes/setdone', async (req, res) => {

    const isDone = req.body.isDone;
    const update = await Note.updateMany({isDone: !isDone}, {isDone: isDone})

    res.send(`Updated ${update.modifiedCount} notes.`);
  })

  app.patch('/notes', async (req, res) => {

    console.log("body: ", req.body)

    const _id = req.body._id;
    const key = req.body.key;
    const val = req.body.val;

    const patch = {[key]: val}

    const update = await Note.updateOne({_id: _id}, patch)

    res.send(`Updated ${update.modifiedCount} note.`);
  })

}

main();


