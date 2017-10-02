var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Cya = require("./models/cya");
mongoose.connect("mongodb://localhost/cya");
var app = express();
var stories = {};
app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/", function(req, res) {
  console.log("A dark horse appears", __dirname);
  res.sendFile(path.join(__dirname, "story.html"));
});

app.get("/Hi/:name", function(req, res) {
  console.log("Here is the params", req.params);
  var name = req.params.name;
  res.send("Hi " + name);
  res.end();
});
app.get("/Hi", function(req, res) {
  console.log("Here is the query", req.query);
  var name = req.query.name;
  res.send("Hi " + name);
  res.end();
});

app.post("/Hi", function(req, res) {
  console.log("Here is the body", req.body);
  var text = req.body.text;
  res.send("Bonjour " + text);
  res.end();
});

app.get("/cya", function(req, res) {
  Cya.find(function(err, cyas) {
    res.json(cyas);
  });
});

app.post("/cya", function(req, res) {
  console.log("body", req.body);

  var newCya = new Cya({
    title: req.body.title,
    text: req.body.text
  });
  newCya.save(function(err, result) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

app.put("/cya", function(req, res) {
  Cya.update({ _id: req.body.cyaID }, { title: req.body.title }, function(
    err,
    result
  ) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

app.delete("/cya", function(req, res) {
  Cya.remove({ _id: req.body.cyaID }, function(err, result) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

app.listen(3001);
