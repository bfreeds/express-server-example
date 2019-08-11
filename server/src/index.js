const express = require("express");

const app = express();
const bodyParser = require("body-parser");

// adds body data to express request object
app.use(bodyParser.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
];

// default route returns an html message
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

// gets all notes
app.get("/notes", (req, res) => {
  console.log(req);

  res.json(notes);
});

// get a single note
app.get("/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(`note ${id} requested.`);

  const note = notes.find(note => {
    return note.id === id;
  });
  console.log(note);

  // respond with note data if found, 404 if not
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

// create a new note
app.post("/notes", (req, res) => {
  // calculate the max id of current notes data
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;

  console.log("maxId", maxId); // 3

  // get the note in the current request
  const note = req.body;
  console.log(note);

  // set the new note's id
  note.id = maxId + 1;

  // add the new note to the existing
  notes = notes.concat(note);

  // just send the note back in response
  res.json(note);
});

// start the server
const port = 3001;

app.listen(port);

console.log("Server is listening on ", port);
