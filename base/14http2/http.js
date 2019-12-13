let http = require("http");
let server = http
  .createServer(function(req, res) {
    console.log(res.headersSent ? "响应头已经发送" : "响应头未发送");
    res.writeHead(200, "ok");
    console.log(res.headersSent ? "响应头已经发送" : "响应头未发送");
    res.end()
  })
  .listen(8080, "127.0.0.1");
