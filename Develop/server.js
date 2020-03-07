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

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Server listens

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log("Server started on port " + PORT));
