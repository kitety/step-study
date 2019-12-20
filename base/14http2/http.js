let http = require("http");
let path = require("path");
let crypto = require("crypto");

let server = http
  .createServer(function(req, res) {
    res.writeHead(200, {
      "Transfer-Encoding": "chunked",
      Trailer: "Content-MD5"
    });
    let rs = require("fs").createReadStream(path.join(__dirname, "msg.txt"), {
      highWaterMark: 200
    });
    let md5 = crypto.createHash("md5");
    rs.on("data", function(data) {
      console.log(data);
      res.write(data);
      md5.update(data);
    });
    rs.on("end", function() {
      res.addTrailers({
        "Content-MD5": md5.digest("hex")
      });
      res.end();
    });
  })
  .listen(8080);
