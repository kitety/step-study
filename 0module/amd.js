// 原理
let factories = {}
function define (moduleName, dependences, factory) {
  factory.dependences = dependences;
  factories[moduleName] = factory
}
function require (modNames, callback) {
  let loadedModNames = modNames.map(function (modName) {
    let factory = factories[modName];
    let dependences = factory.dependences;
    let exports;
    require(dependences, function (...dependencyMods) {
      exports = factory.apply(null, dependences)
    })
    return exports
  })
  callback.apply(null, loadedModNames)
}
// js运行环境没有原生支持AMD,需要先导入实现了AMD的库后才能正常使用*/
// 用法
// 定义一个模块
define('a', [], function () {
  return 'a'
});
define('b', ['a'], function (a) {
  return a + 'b'
});
require(['b'], function (b) {
  console.log(b)
})
