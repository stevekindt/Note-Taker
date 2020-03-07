// Dependencies

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// Parser with Express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Get Methods
// Routes to index.html
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Routes to notes.html
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Routes to db.json
app.get("/api/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "db/db.json"));
});

//POST Method
// Create new note object and write it to the JSON file with incremented id
app.post("/api/notes", function(req, res) {
  fs.readFile(path.join(__dirname, "db/db.json"), "utf8", function(
    error,
    response
  ) {
    if (error) {
      console.log(error);
    }
    const notes = JSON.parse(response);
    const noteRequest = req.body;
    const newNoteId = notes.length + 1;
    const newNote = {
      id: newNoteId,
      title: noteRequest.title,
      text: noteRequest.text
    };
    notes.push(newNote);
    res.json(newNote);
    fs.writeFile(
      path.join(__dirname, "db/db.json"),
      JSON.stringify(notes),
      function(err) {
        if (err) throw err;
      }
    );
  });
});

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Server listens

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log("Server started on port " + PORT));
