/*
function that gets parameters suchs as the below and returns an html document
title : Sites title
list : Lists that you can visit
body : contains data you want to see
control : contains the link to trsndfer you
  -create : make more lists with data
  -update : update or delete existing list with data
*/
/*
function that gets the titles of every documents in the data folder and converts
them to html documents (converts them to listed links)
*/

module.exports = {
  'html':function(title, list, body, control){
  return `
  <!doctype html>
  <html>
  <head>
    <title>${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">${title}</a></h1>
    ${list}
    ${control}
    ${body}
  </body>
  </html>
  `;},'list':function(filelist){
    var list = '<ul>';
    for(var i=0;i<filelist.length;i++){
      list+=`<li><a href="http://222.99.16.137:8081/download/${filelist[i]}">${filelist[i]}</a></li>`
    }list += '</ul>';
    return list;
  }
}
