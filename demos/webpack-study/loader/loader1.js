// 参数就是源代码
function loader(source) {
  console.log(1);
  return source;
}
loader.pitch = () => {
  console.log("1 pitch");
  return "234";
};
module.exports = loader;
