// 参数就是源代码
function loader(source) {
  console.log(2);
  return source;
}
// 返回的值会放入源码
loader.pitch = () => {
  console.log("2 pitch");
  return '234'
};

module.exports = loader;
