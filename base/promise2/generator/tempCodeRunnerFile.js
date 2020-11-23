
let fs = require("fs");

function promises(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };
}
// 返回一个函数
let readFile1 = promises(fs.readFile);
// 返回一个promise
readFile1("./name.txt", "utf8").then((d) => {
  console.log(d);
});
