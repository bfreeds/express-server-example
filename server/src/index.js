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

// calculate and return a new id
const generateId = () => {
  // calculate the max id of current notes data
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;

  return maxId + 1;
};

// add a new note to notes
app.post("/notes", (req, res) => {
  const body = req.body;

  // return error if missing content
  if (!body.content) {
    return res.status(400).json({
      error: "content missing"
    });
  }

  // new note to add
  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId()
  };

  // add the new note to the existing
  notes = notes.concat(note);

  // send the note back in response
  res.json(note);
});

// start the server
const port = 3001;

app.listen(port);

console.log("Server is listening on ", port);
