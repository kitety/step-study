let zlib = require("zlib");
let path = require("path");

function zip(src) {
  const gzip = zlib.createGzip();
  const fs = require("fs");
  const inp = fs.createReadStream(path.join(__dirname, src));
  const out = fs.createWriteStream(path.join(__dirname, src + ".gz"));
  inp
    .pipe(gzip)
    .on("error", () => {
      // 处理错误
    })
    .pipe(out)
    .on("error", () => {
      // 处理错误
    });
}
zip("source.txt");
