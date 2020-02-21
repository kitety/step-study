const zlib = require("zlib");
const fs = require("fs");
const http = require("http");
const path = require("path");
http
  .createServer((req, res) => {
    const c = "." + req.url;
    console.log(c);
    var raw = fs.createReadStream(c);
    // console.log(raw.toString());
    // raw.on("data", function(data) {
    //   console.log(data.toString());
    // });
    // var raw = fs.createReadStream("." + req.url);
    var acceptEncoding = req.headers["accept-encoding"];
    if (!acceptEncoding) {
      acceptEncoding = "";
    }
    console.log(acceptEncoding);
    if (acceptEncoding === "deflate") {
      console.log(1);
      res.setHeader("Content-Encoding", "deflate");
      raw.pipe(zlib.createDeflate()).pipe(res);
    } else if (acceptEncoding === "gzip") {
      console.log(2);

      res.setHeader("Content-Encoding", "gzip");
      raw.pipe(zlib.createGzip()).pipe(res);
    } else {
      console.log(3);

      raw.pipe(res);
    }
  })
  .listen(9000);
