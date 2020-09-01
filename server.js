// Dependencies
var express = require("express");
var path =  require("path")
var app = express();
var PORT = 3000;
var db = require("./db/db.json")
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'))

app.get('/notes', function (req, res) {
  res.sendFile(path.join(__dirname,"./public/notes.html"))
})

app.get('/api/notes', function (req, res) {
  res.json(db)
})

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname,"./public/index.html"))
})


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });