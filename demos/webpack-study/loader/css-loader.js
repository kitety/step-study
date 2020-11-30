// 参数就是源代码
function loader(source) {
  console.log("css-loader");
  let reg = /url\((.+?)\)/g;
  let pos = 0;
  let arr = ["let list=[]"];
  // 正则匹配出来进行替换
  while ((current = reg.exec(source))) {
    //[matchUrl,group]  "url('./img/06jpg')",
    // "'./img/06jpg'",
    [matchUrl, group] = current;
    let last = reg.lastIndex - matchUrl.length; // 得到匹配的开始字符串
    arr.push(`list.push(${JSON.stringify(source.slice(pos, last))})`); //放入代码
    pos = reg.lastIndex; //更新开始位置
    arr.push(`list.push('url('+require(${group})+')')`);
  }
  arr.push(`list.push(${JSON.stringify(source.slice(pos))})`);
  // 暴露数组的join的字符串
  arr.push(`module.exports=list.join('')`);
  return arr.join("\r\n");
}

module.exports = loader;
