// Dependencies
var express = require("express");
var path =  require("path")
var fs = require("fs")
var app = express();
var PORT = process.env.PORT||3000;
var db = require("./db/db.json")
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'))

function writeDb (res){
  fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
    res.sendStatus(200)
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
  writeDb(res)
})

app.delete('/api/notes/:id', function (req, res){
  var id = req.params.id
  for (var i=0; i < db.length; i++){
    if (db[i].id === parseInt(id)){
      db.splice(i,1)
    }
  }
  console.log(db)
  writeDb(res)
})

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname,"./public/index.html"))
})


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });