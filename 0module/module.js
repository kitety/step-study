/**一、模块化 */
/* 1.命名空间 */
// <script src="jquery.js" > </script>
/**
 * 命名空间冲突，两个库可能使用同一个名称
 * 无法合理地管理项目的依赖和管理
 * 无法方便地控制依赖的加载顺序
 */

/* 2.CommonJS
广泛使用的JS模块化规范，核心思想是用require来同步加载其他模块，通过module.exports导出需要暴露的接口 */
// 导入
const someFun = require('./modulA')
someFun()
// 导出
module.exports = someFun
// 原理
// a.js
let fs = reuqire('fs')
let path = reuqire('path')
let b = req('./module.js')

function req (mod) {
  let filename = path.join(__dirname, mod);
  let content = fs.readFileSync(filename, 'utf8');
  let fn = new Function('exports', 'require', 'module', '__filename', '__dirname', content + '\n return module.exports;');
  let module = {
    exports: {}
  };
  return fn(module.exports, req, module, __filename, __dirname)
}

// b.js
console.log('bbb')
module.exports = 'afps'

/* 3.AMD */
/* JS规范，与commonjs最大的不同就是他采用的是异步的方式去加载以来的模块。主要为了解决针对浏览器环境的模块化问题，最具有代表性的实现是requirejs
优点：
1.在不转换代码的情况下直接在浏览器运行
2.可加载多个依赖
3.代码直接在浏览器和nodejs直接运行
缺点：
js运行环境没有原生支持AMD,需要先导入实现了AMD的库后才能正常使用*/
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
/* 4.ES6模块化 */
/* ES6 模块化是ECMA提出的JavaScript模块化规范，它在语言的层面上实现了模块化。浏览器厂商和Node.js 都宣布要原生支持该规范。它将逐渐取代CommonJS和AMD`规范，成为浏览器和服务器通用的模块解决方案 */
//导入
import {name} from './person.js';
//导出
export const name='hello'

/*二、自动化构建*/
/*1.代码转换：es6转换为es6,less编译为css等
* 2.文件优化：压缩js css html,压缩合并图片
* 3.代码分割：提取公共代码，提取首屏不需要的代码让其异步加载
* 4.代码合并：采用模块化的项目里面将包含多个模块和文件，需要构建功能将模块分类合成一个文件
* 5.自动刷新：监听本地的源代码，自动构建刷新浏览器
* 6.代码校验：在代码被提交到仓库前校验代码是否符合规范，以及单元测试是否通过
* 7.自动发布：更新之后，自动构建出线上发布代码并且传输给刚发布系统*/

/*三、Webpack*/
//各种资源的打包工具
