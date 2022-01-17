import express from "express";
import cors from 'cors'

const app = express();

const port = 4000;

app.listen(port, function() {
  console.log("Server is running on Port: " + port);
});

import mongoose from "mongoose";

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
  })
)
app.use(express.json())


var uri = "mongodb://localhost:27017/todo";

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
    created: Number
  });
    
  const Note = mongoose.model('Note', noteSchema);


  app.get('/notes', async (req, res) => {
    const notes = await Note.find();
    notes.sort((a,b) => {
      return b.created - a.created;
    })
    res.json(notes);
  })

  app.post('/notes', async (req, res) => {

    console.log(req.body)

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

    console.log("body: ", req.body)

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


