// Dependencies
var express = require("express");
var path =  require("path")
var fs = require("fs")
var app = express();
var PORT = 3000;
var db = require("./db/db.json")
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'))

function writeDb (){
  fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}


app.get('/notes', function (req, res) {
  res.sendFile(path.join(__dirname,"./public/notes.html"))
})

app.get('/api/notes', function (req, res) {
  res.json(db)
})

app.post('/api/notes', function (req, res){
  console.log(req.body)
  if(db.length){
    req.body.id = db[db.length-1].id+1
  }else{
    req.body.id = 1
  }
  db.push(req.body)
  writeDb()
  console.log(db)
  res.sendStatus(200)
})

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname,"./public/index.html"))
})


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });