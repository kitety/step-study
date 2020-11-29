let loaderUtils = require('loader-utils')

// 图片的buffer
function loader (source) {
  // file loader 返回路径
  // 通过内容 生成md5
  // 根据格式生成路径
  let filename = loaderUtils.interpolateName(this, '[hash].[ext]', { content: source })
  // 发送文件到output
  this.emitFile(filename, source
  )
  // 这样导入的那一句拿到的就是一个字符串
  return `module.exports="${filename}"`;
}
// 读取二进制
loader.raw = true


module.exports = loader;
