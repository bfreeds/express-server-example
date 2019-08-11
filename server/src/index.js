const express = require("express");

const app = express();

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

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/notes", (req, res) => {
  console.log(req);

  res.json(notes);
});
const port = 3001;

app.listen(port);

console.log("Server is listening on ", port);
