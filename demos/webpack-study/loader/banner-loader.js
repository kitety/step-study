let loaderUtils = require('loader-utils')
let fs = require('fs')
let schemaUtils = require('schema-utils');

// 参数就是源代码
function loader (source) {
  // this loader的上下文
  //  { presets: [ '@babel/preset-env' ] }
  this.cacheable()// 缓存  推荐
  const options = loaderUtils.getOptions(this);
  const { filename, text } = options
  let schema = {
    type: 'object',
    properties: {
      text: {
        type: 'string'
      },
      filename: {
        type: 'string'
      }
    }
  }
  schemaUtils.validate(schema, options, { name: 'babel-loader' })// 报错讯息
  let data = text
  if (filename) {
    // 添加依赖
    this.addDependency(filename)
    data = fs.readFileSync(filename, 'utf8')
  }
  source = `/**${data}**/${source}`
  return source
}

module.exports = loader;
