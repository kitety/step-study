let loaderUtils = require('loader-utils')
let mime = require('mime')

// 图片的buffer
function loader (source) {
  // file loader 返回路径
  const options = loaderUtils.getOptions(this);
  const { limit } = options
  // 配置且 满足条件
  if (limit && limit > source.length) {
    // 转换为base64
    return `module.exports="data:${mime.getType(this.resourcePath)};base64,${source.toString('base64')}"`;

  }
  return require('./file-loader').call(this, source)
}
// 读取二进制
loader.raw = true


module.exports = loader;
