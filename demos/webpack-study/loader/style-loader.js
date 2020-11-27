// 插入到head
function loader(source) {
  // JSON.stringfy 转为一行
  let style = `
  let style=document.createElement('style')
  style.innerHTML=${JSON.stringify(source)}
  document.head.appendChild(style)
  `;
  return style;
}
module.exports = loader;
