// 参数就是源代码
function loader(source) {
  console.log("inline-loader");
  return source;
}

module.exports = loader;
