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
 * 在硬盘某个位置，加载速度很慢，文件模块通过名称或路径来加载，文件模块后缀有三种
 * .js 的脚本文件，先读入内存在运行
 * .json json文件，读入内存，转换为json对象
 * .node 经过编译后的二进制c/c++扩展模块文件，可以支架使用
 * （一般自己的写的是通过路径加载，别人写的是通过名称去当前目录的node_modules寻找）
 */

//  4.3第三方模块
// 使用require就只从node_modules寻找，这样不用修改路径。
// 第三方模块的查询路径包括node_modules和全局目录

// 4.3.1全局目录
// window如果在环境变量中设置了NODE_PATH变量，并将变量设置为一个有效的磁盘目录，require在本地找不到此模块时向在此目录下找这个模块。 
// UNIX操作系统中会从 $HOME/.node_modules $HOME/.node_libraries目录下寻找

// 4.4模块的加载策略
// 见图lookmodule.png

// 4.5 文件模块查找规则
// lookfile.png  递归查路径 添加后缀、缓存路径

/* 5.从模块外部访问模块内部成员 */
// exports对象
// module.exports导出引用类型

/* 6.模块对象的属性 */
// http://www.ruanyifeng.com/blog/2015/05/require.html
/**
 * module.id
 * module.filename
 * module.loaded
 * module.parent
 * module.children
 * module.paths
 */
