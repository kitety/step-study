let http = require("http");
let fs = require("fs");
let server = http
  .createServer(function(req, res) {
    let body = [];
    req.on("data", function(data) {
      body.push(data);
    });
    req.on("end", function() {
      let result = Buffer.concat(body);
      console.log(result.toString());
    });
  })
  .listen(8080, "127.0.0.1");
