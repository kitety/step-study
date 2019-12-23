let zlib = require("zlib");
let fs = require("fs");
let path = require("path");

function unZip(src) {
  const gzip = zlib.createGunzip();
  const fs = require("fs");
  const inp = fs.createReadStream(path.join(__dirname, src + ".gz"));
  const out = fs.createWriteStream(path.join(__dirname, "unzip." + src));
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
unZip("source.txt");
