// 方法调用
const zlib = require("zlib");
const fs = require("fs");
var out = fs.createWriteStream("input.log");
var input = "input";
zlib.gzip(input, (err, buffer) => {
  console.log(buffer);
  if (!err) {
    zlib.unzip(buffer, (err, buffer) => {
      if (!err) {
        console.log(buffer.toString());
        out.end(buffer);
      }
    });
  }
});
