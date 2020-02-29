let http = require("http");
let fs = require("fs");
let mime = require("mime");
let path = require("path");
let crypto = require("crypto");

function send (req, res, file, etag) {
  res.setHeader('ETag', etag);
  res.writeHead(200, { 'Content-Type': mime.lookup(file) });
  fs.createReadStream(file).pipe(res);
}
function sendError (err, req, res, file, etag) {
  res.writeHead(400, { "Content-Type": 'text/html' });
  res.end(err ? err.toString() : "Not Found");
}
http.createServer((req, res) => {
  let file = path.join(__dirname, req.url)
  fs.stat(file, (err, stat) => {
    if (err) {
      sendError(err, req, rea, file, stat)
    }
    else {
      let ifNoneMatch = req.headers['if-none-match']
      let etag = crypto.createHash('sha1').update(stat.ctime.toGMTString() + stat.size).digest('hex')
      if (ifNoneMatch == etag) {
        res.writeHead(304)
        res.end()
      } else {
        send(req, res, file, etag)
      }
    }
  })
}).listen8(8000)

