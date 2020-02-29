let http = require("http");
let fs = require("fs");
let mime = require("mime");
let path = require("path");
let crypto = require("crypto");

function send (req, res, file) {
  let expires = new Date(Date.now() + 60 * 1000)
  res.setHeader('Expires', expires.toUTCString())
  res.setHeader('Cache-Control', 'max-age=60')
  res.writeHead(200, { 'Content-Type': 'text/html' })
  fs.createReadStream(file).pipe(res)
}
function sendError (err, req, res, file, etag) {
  res.writeHead(400, { "Content-Type": 'text/html' });
  res.end(err ? err.toString() : "Not Found");
}
http.createServer(req, res => {
  let file = path.join(__dirname, req.url)
  console.log(file)
  fs.stat(file, (err, stat) => {
    if (err) {
      sendError(err, req, rea, file, stat)
    } else {
      send(req, res, file)
    }
  })
})
