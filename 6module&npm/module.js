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

 /* 7.包 */
 /**
  * 在nodejs中，通过包来对一组具有相互依赖的模块来统一管理，通过包可以将某个独立的功能封装起来
  * 每个项目的根目录下，一般有package.json文件，定义了这个项目的所需要的各个模块和配置信息（名称 版本 许可证等元数据）。npm install命令就是根据这个配置文件，自动下在所需要的模块，也就是配置项目所需的运行和开发环境
  */
/**
 * name            项目名称
 * version         版本号
 * description     项目描述
 * keywords：{Array} 关键词
 * homepage         url主页
 * bugs             项目问题反馈的url/email
 * license          项目许可证
 * author,contributors          作者和贡献者
 * main             主文件
 * bin              项目用到的可执行文件
 * repository       项目代码存放地方
 * scripts          声明一系列npm脚本指令
 * dependencies     项目在生产环境中依赖的包
 * devDependencies   项目在开发环境中依赖的包
 * peerDependencies  应用运行依赖的宿主包
 */

 /* 8.NPM */
/**
 * 8.1安装
 * 8.1.1 局部安装
 * npm install <package-name>
 * npm install <package name>@<version spec> // 指定版本
 * 8.1.2全局安装
 * npm install <package-name> -g
 * 
 * 8.2 卸载
 * npm uninstall <package name>
 * 
 * 8.3 更新
 * npm update <package name>
 * 8.4 npx
 * npm 从5.2版开始，增加了 npx 命令
 * 8.4.1 解决的问题就是调用项目内部安装的模块，在node_modules中执行命令
 * 8.4.2 避免全局安装模块
 * npx create-react-app my-react-app
 */

 /* 9.yarn */
 /**
  * 9.1 初始化
  * yarn init
  * 
  * 9.2添加依赖包
  * yarn add [package]
  * yarn add [package]@[version]
  * yarn add [package]@[tag]
  * 
  * 9.3更新依赖包
  * yarn upgrade [package]
  * yarn upgrade [package]@[version]
  * yarn upgrade [package]@[tag]
  * 
  * 9.4删除一个依赖包
  * yarn remove [package]
  * 
  * 9.5安装所有依赖包
  * yarn或yarn install
  */
