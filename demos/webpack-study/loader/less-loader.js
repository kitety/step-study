// loader就是一个函数
let less = require("less");
function loader(source) {
  let css = "";
  // 同步代码 但是需要用回调来写
  less.render(source, function (err, c) {
    css = c.css;
  });
  return css;
}
module.exports = loader;
