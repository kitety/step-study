/* 1.js模块化方面的不足 
js没有模块系统，不支持封闭的作用域和依赖管理
也没有标准库，没有文件系统和IO流API
没有包管理系统
*/

/* 2.Commonjs规范
封装功能
封闭作用域
可能解决依赖功能
效率更高 更方方便
*/

/* 3.Node中的Commonjs */
// 在nodejs里，模块划分所有的功能，每个js都是一个模块
// 实现require方法，npm实现了模块的自动加载和安装依赖
{
  (function (exports, require, module, __filename, __dirname) {
    exports = module.exports = {};
    exports.name = 'lib';
    // exports={name:'lib'}
    return module.exports
  })
}

/* 4.模块分类 */
// 4.1原生模块
// http path fs util events编译为二进制，加载速度加快，原来的模块通过名称来加载

// 4.2文件模块
/**
 * 在硬盘
 */
