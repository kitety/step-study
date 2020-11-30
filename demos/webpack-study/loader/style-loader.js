const loaderUtils = require("loader-utils");
// 插入到head
function loader(source) {
  console.log("source: ", source);
  // JSON.stringfy 转为一行
  let style = `
  let style=document.createElement('style')
  style.innerHTML=${JSON.stringify(source)}
  document.head.appendChild(style)
  `;
  return style;
}
// style loader上写了pitch
// style-loader css-loader less-loader   css-loader.js!less-loader.js!index.less
// 剩下的请求
loader.pitch = function (remainingRequest) {
  //  css-loader.js!less-loader.js!index.less
  console.log(
    "loaderUtils.stringifyRequest(",
    loaderUtils.stringifyRequest(this, "!!" + remainingRequest)
  );
  // 字符串的拼接和行内loader的使用
  let style = `
  let style=document.createElement('style')
  style.innerHTML=require(${loaderUtils.stringifyRequest(
    this,
    "!!" + remainingRequest
  )})
  document.head.appendChild(style)
  `;
  return style;
};
module.exports = loader;
