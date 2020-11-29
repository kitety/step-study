let babel = require('@babel/core')
let loaderUtils = require('loader-utils')

// 参数就是源代码
function loader (source) {
  // this loader的上下文
  //  { presets: [ '@babel/preset-env' ] }
  const options = loaderUtils.getOptions(this);
  let cb = this.async()
  console.log('options: ', options);
  babel.transform(source, { ...options, sourceMap: true, filename: this.resourcePath.split('/').pop() }, function (err, result) {
    // err code map
    return cb(err, result.code, result.map)
  })
  return source
}

module.exports = loader;
