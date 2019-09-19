const fs = require('fs');
const path = require('path');
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
        console.log('异步创建ok');
    })
}
// 3.2同步
// fs.writeFileSync(file, data[, options])
{
    fs.writeFileSync('./9fs/writeFileSync.txt', Date.now() + '同步创建\n', { flag: 'a' })
    console.log('同步创建ok');
}
// 3.3 追加文件
// fs.appendFile(path, data[, options], callback) 异步地将数据追加到文件，如果文件尚不存在则创建该文件
{
    fs.appendFile('./9fs/writeFile.txt', Date.now() + '追加文件\n', function () {
        console.log('追加ok');
    })
}
// 3.4拷贝文件
// 读完再写
function copy(src, target) {
    fs.readFile(src, function (err, data) {
        console.log(data)
        if (!err) {
            fs.writeFile(target, data, function (err, data) {
                if (!err) {
                    console.log('复制成功')
                }
            })
        }
    })
}
// copy('./9fs/writeFile.txt', './9fs/writeFileCopy.txt')

/* 4.从指定位置处开始读取文件 */

// 4.1打开文件
/**
 * fs.open(path[, flags[, mode]], callback)
 * path 路径
 * flags 支持的文件系统标志。
 * mode 默认值: 0o666（可读写）
 * callback 回调函数
 */
// fs.open('./9fs/writeFile.txt', 'r', 0600, function (err, data) {
//   if (!err) {
//     console.log(data)
//   } else {
//     console.log(err)
//   }
// })

// 4.2读取文件
/**
 * fs.read(fd, buffer, offset, length, position, callback)
 */
fs.open(path.join(__dirname, 'temp.txt'), 'r', 0o666, function (err, fd) {
    if (!err) {
        let buf = Buffer.alloc(12);
        fs.read(fd, buf, 0, 12, 0, function (err, butesRead, buffer) {
            console.log('读取文件')
            console.log(butesRead)
            console.log(buffer === buf)
            console.log(buf.toString())
        })
    } else {
        console.log(err)
    }
})

// 4.3写入文件
/**
 * fd文件描述符 从open拿到
 * fs.write(fd, buffer[, offset[, length[, position]]], callback)
 */
fs.open(path.join(__dirname, 'temp.txt'), 'w', 0o666, function name(err, fd) {
    // console.log(err);
    let buf = Buffer.from('天天向上');
    fs.write(fd, buf, 0, 12, 0, function (err, bytesWritten, buffer) {
        console.log(bytesWritten)
        console.log(buffer.to)
        console.log('写入文件')
    })
})
// 4.4 同步磁盘缓存
// fs.fsync(fd[, callback])
// 4.5 关闭文件
// fs.close(fd[,callback])
let buf3 = Buffer.from('关闭文件');
fs.open(path.join(__dirname, 'temp.txt'), 'w', function (err, fd) {
    fs.write(fd, buf3, 0, 12, 0, function (err, written, buffer) {
        console.log(written)
        fs.fsync(fd, function (err) {
            fs.close(fd, function (err) {
                console.log('写入完毕')
            })
        })
    })
})
// 4.6 拷贝文件
let BUFFER_SIZE = 12
function copy2(src, dest, callback) {
    let buf = Buffer.alloc(BUFFER_SIZE);
    fs.open(src, 'r', (err, readFd) => {
        fs.open(dest, 'w', (err, writeFd) => {
            // 前面加上一个布尔运算符（只多了一个感叹号），就是表达式了，将执行后面的代码，也就合法实现调用
            // https://segmentfault.com/q/1010000000117476
            !function read() {
                fs.read(readFd, buf, 0, BUFFER_SIZE, null, (err, bytesRead) => {
                    bytesRead && fs.write(writeFd, buf, 0, bytesRead, read, function () {
                        callback();
                    })
                })
            }()
        })
    })
}
// copy2(path.join(__dirname, 'temp.txt'), path.join(__dirname, 'temp2.txt'), function () {
//     console.log('拷贝完成')
// })

/* 5.目录操作 */

// 5.1 创建目录
/**
 *  fs.mkdir(path[, mode], callback)
 * 可选的 options 参数可以是指定模式（权限和粘滞位）的整数，也可以是具有 mode 属性和 recursive 属性（指示是否应创建父文件夹）的对象
 */

// 5.2判断一个文件是否有权限访问
// fs.access(path[, mode], callback)
fs.access(__dirname, fs.constants.R_OK | fs.constants.W_OK, err => {
    console.log(err ? 'no access' : 'can read/write')
})

// 5.3读取目录下的所有的文件
// fs.readdir(path[, options], callback)

// 5.4查看文件的目录信息 
// fs.stat(path[, options], callback)要检查文件是否存在但随后并不对其进行操作，则建议使用 fs.access() 。
/**
 * stats.isFile() 如果 fs.Stats 对象描述常规文件，则返回 true。
 * stats.isDirectory() 如果 fs.Stats 对象描述文件系统目录，则返回 true。
 * atime(Access Time)上次被读取的时间。
 * ctime(State Change Time)属性或内容上次被修改的时间
 * mitime（Modified time）档案的内容上次被修改的时间
 */

//  5.5移动文件或目录
// fs.rename(oldpath,newpath,callback)
// 5.6 删除文件
// fs.unlink(path,callback)
// 5.7 截断文件
// fs.ftruncate(fd[,len],callback) 如果文件描述符指向的文件大于 len 个字节，则只有前面 len 个字节会保留在文件中。如果文件小于 len 个字节，则会对其进行扩展，并且扩展部分将填充空字节（'\0'）：
{
    const fd = fs.openSync(path.join(__dirname, 'temp.txt'), 'r', 0o666)
    fs.ftruncate(fd, 3, err => {
        console.log('截断文件:',fs.readFileSync(path.join(__dirname, 'temp2.txt'), 'utf8'))
    })
}
// 5.8 监视文件或目录
// fs.watchFile(filename[, options], listener) 监视 filename 的更改。 每当访问文件时都会调用 listener 回调。
{
    // 这个会一直执行
    // fs.watchFile(path.join(__dirname, 'temp.txt'),(curr,prev)=>{
    //     if (Date.parse(prev.ctime)==0) {
    //         console.log('监视文件：创建')
    //     }else if (Date.parse(curr.ctime==0)) {
    //         console.log('监视文件：删除')
    //     } else if (Date.parse(prev.ctime) != Date.parse(curr.ctime)) {
    //         console.log('监视文件：修改')            
    //     }
    // })
}
