var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require('path');
var formidable = require("formidable");
var template = require('./lib/template.js') //handmade html template

http.createServer(function(req, res){
  var _url = req.url;//gets the full url ex)"/hi?id=Qfdsnf93sda"
  var pathname = url.parse(_url, true).pathname;//gets url's pathname ex)"/hi?id=Qfdsnf93sda" -> "/hi"
  var queryData = url.parse(_url, true).query;//gets the url's querydata ex)"/hi?id=Qfdsnf93sda" -> "Qfdsnf93sda"

  // console.log(pathname);
  // console.log(queryData);


  if(pathname === "/"){
    if(queryData.id === undefined){
      var title = "Esteban's Cloud";
      var body = "Welcome to Esteban's Cloud";
      var control="";
      fs.readdir('./data', function (err, filelist) {
          if(err){return console.log('Unable to scan directory: ' + err);}
          var list=template.list(filelist);
          console.log(list);
          var htmlTemplate = template.html(title, list, body, control);
          res.writeHead(200);
          res.end(htmlTemplate);//go to mainpage
      });
    }else{

    }

  }else if(pathname === '/fileupload_process') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = './data/' + files.filetoupload.name;
      console.log(oldpath);
      console.log(newpath);
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
    });

  }else if(pathname === '/fileupload'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload_process" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    res.end();

  }

}).listen(8080);
