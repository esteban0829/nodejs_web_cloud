var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require('path');
var formidable = require("formidable");
var express = require('express');
var app = express();

http.createServer(app).listen(8081, function(){
  console.log('Server Running...');
})

app.get('/download', function(req, res){
  var file = __dirname + '/data/hamster.jpg';
  console.log(req.url);
  console.log(file);
  res.download(file); // Set disposition and send it.
  res.end("file is downloading...");
});
