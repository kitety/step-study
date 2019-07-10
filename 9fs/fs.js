var fs = require('fs');
/* 1.fs模块 */
/**
 * 在nodejs中，使用fs模块来实现所有有关文件、目录的创建 写入 删除
 * 在fs模块中，所有的方法都分为同步和异步两种实现
 * 具有async后缀的方法为同步方法，不具有的是异步方法
 */

/* 2.整体读取文件 */
/**
 * options
  encoding
  http://nodejs.cn/api/fs.html#fs_file_system_flags
  flag flag 默认 = 'r'
 */
//  异步
// fs.readFile(path[, options], callback)
// 同步
// fs.readFileSync(path[, options], callback)

/* 3.写入文件 */
/**
 * encoding <string> | <null> 默认值: 'utf8'。
  mode <integer> 默认值: 0o666。
  flag <string> 参阅支持的文件系统标志。默认值: 'w'。
 */
// 3.1异步
// fs.writeFile(file, data[, options], callback)
{
  fs.writeFile('./9fs/writeFile.txt', Date.now() + '异步创建\n', { flag: 'a' }, function () {
    console.log('ok');
  })
}
// 3.2同步
// fs.writeFileSync(file, data[, options])
{
  fs.writeFileSync('./9fs/writeFileSync.txt', Date.now() + '同步创建\n', { flag: 'a' })
  console.log('ok');
}
// 3.3 追加文件
// fs.appendFile(path, data[, options], callback) 异步地将数据追加到文件，如果文件尚不存在则创建该文件
{
  fs.appendFile('./9fs/writeFile.txt', Date.now() + '追加文件\n',function(){
    console.log('追加ok');
  })
}
