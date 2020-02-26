const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = require('mime')

function sendError (err, req, res, file, stat) {
  res.writeHead(400, { "Content-Type": 'text/html' })
  res.end(err ? err.toString() : 'Not Found')
}
function send (req, res, file, stat) {
  res.setHeader('Last-Modified', stat.ctime.toGMTString())
  res.writeHead(200, { 'Content-Type': mime.getType(file) })
  fs.createReadStream(file).pipe(res)
}
http.createServer((req, res) => {
  let file = path.join(__dirname, req.url)
  fs.stat(file, (err, stat) => {
    if (err) {
      sendError(err, req, res, file, stat)
    } else {
      let ifModifiedSince = res.headers['if-modified-since']
      if (ifModifiedSince && ifModifiedSince === stat.ctime.toGMTString()) {
        res.writeHead(304)
        res.end()
      } else {
        send(req, res, file, stat)
      }
    }
  })
})
