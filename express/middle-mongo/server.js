import express from "express";
import uniqid from 'uniqid'
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


var uri = "mongodb://localhost:27017/details";

async function main() {
  await mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
  const connection = mongoose.connection;
  connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
  });
  const noteSchema = new mongoose.Schema({
    text: String,
    _id: String,
    isDone: Boolean
  });
    
  const Note = mongoose.model('Note', noteSchema);
  const TestNote = new Note({ 
    text: 'Test note title',
    _id: uniqid(),
    isDone: true
   });

  await TestNote.save();

  const notes = await Note.find();

  app.get('/', (req, res) => {
    res.json(notes)
  })
  
  app.get('/:id', function (req, res) {

    async function getNote(id) {
      return await Note.find({_id: id});
    }

    const id = req.params.id;

    const note = getNote(id);
    console.log(note);
    res.json(note);
  })

}

main();


