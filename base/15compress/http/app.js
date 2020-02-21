const zlib = require("zlib");
const fs = require("fs");
const http = require("http");
let path = require("path");

var request = http.get({
  host: "localhost",
  path: "/index.html",
  port: 9000,
  headers: {
    "accept-encoding": "gzip"
  }
});
request.on("response", res => {
  var output = fs.createWriteStream(path.join(__dirname, "test.txt"));
  console.log(111, res.headers["content-encoding"]);
  switch (res.headers["content-encoding"]) {
    case "gzip":
      res.pipe(zlib.createUnzip()).pipe(output);
      break;
    case "deflate":
      res.pipe(zlib.createInflate()).pipe(output);
      break;
    default:
      res.pipe(output);
      break;
  }
});
request.end();
