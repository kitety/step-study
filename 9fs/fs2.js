/* 6.递归创建目录 */
// 6.1 同步创建目录
let fs = require('fs');
let path = require('path');
{
  function makeSync (dir) {
    // path.sep提供平台特定的路径片段分隔符：
    let parts = dir.split(path.sep)
    for (let i = 1; i < parts.length; i++) {
      let parent = parts.slice(0, i).join(path.sep)
      try {
        fs.accessSync(parent)
      } catch (error) {
        fs.mkdirSync(parent)
      }
    }
  }

  // makeSync(path.join(__dirname, '/1/2/3'))
}
// 6.2 异步创建目录
{
  function maked (dir, callback) {
    // path.sep提供平台特定的路径片段分隔符：
    let parts = dir.split(path.sep)
    let i = 1;

    function next () {
      if (i > parts.length) {
        return callback && callback();
      }
      let parent = parts.slice(0, i++).join(path.sep);
      fs.access(parent, err => {
        if (err) {
          fs.mkdir(parent, next)
        } else {
          next()
        }
      })

    }

    next()
  }

  // maked(path.join(__dirname, '/1/2/3'))
}
// 6.3 Async+Await创建目录
{
  // await 命令后面的 Promise 对象
  async function mkdir (parent) {
    return new Promise((resolve, reject) => {
      fs.mkdir(parent, err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  async function access (parent) {
    return new Promise((resolve, reject) => {
      fs.access(parent, err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  async function makePromise (dir, callback) {
    let parts = dir.split(path.sep);
    for (let i = 1; i < parts.length; i++) {
      let parent = parts.slice(0, i).join(path.sep);
      try {
        await access(parent)
      } catch (error) {
        await mkdir(parent)
      }
    }
    callback()
  }

  makePromise(path.join(__dirname, '/1/2/3'), () => {
    // console.log('promise 创建文件夹完成')
  })
}

/* 7.递归删除目录 */
// 7.1 同步删除目录 深度优先
// fs.unlinkSync 同步地删除文件或符号链接
// fs.readdirSync 同步地读取目录的内容
// fs.rmdirSync 同步地删除一个空目录
{
  function rmSync (dir) {
    try {
      let stat = fs.statSync(dir);
      if (stat.isFile()) {
        fs.unlinkSync(dir)
      } else {
        let files = fs.readdirSync(dir);
        files.map(file => path.join(dir, file)).forEach(item => rmSync(item));
        fs.rmdirSync(dir)
      }
      console.log('删除成功')
    } catch (e) {
      console.log('删除失败')
    }
  }

  // rmSync(path.join(__dirname,'/3'))
}

// 7.2 异步删除非空目录（Promise版）
{
  function rmPromise (dir) {
    return new Promise((resolve, reject) => {
      fs.stat(dir, (err, stat) => {
        if (err) return reject(err)
        if (stat.isDirectory()) {
          fs.readdir(dir, (err, files) => {
            let paths = files.map(file => path.join(dir, file))
            let promise = paths.map(p => rmPromise(p))
            Promise.all(promise).then(() => fs.rmdir(dir, resolve))
          })
        } else {
          fs.unlink(dir, resolve)
        }
      })
    })
  }

  // rmPromise(path.join(__dirname, '/3')).then((result) => {
  //   console.log('删除成功');
  // }).catch((err) => {
  //   console.log('删除失败');
  // });
}

// 7.3 异步串行删除目录(深度优先)
{
  function rmAsyncSeries (dir, callback) {
    setTimeout(() => {
      fs.stat(dir, (err, stat) => {
        if (err) return callback(err)
        if (stat.isDirectory()) {
          fs.readdir(dir, (err, files) => {
            let paths = files.map(file => path.join(dir, file))

            function next (index) {
              if (index >= files.length) return fs.rmdir(dir, callback)
              let current = paths[index];
              rmAsyncSeries(current, () => next(index + 1))
            }

            next(0)
          })
        } else {
          fs.unlink(dir, callback)
        }
      })
    }, 0);
  }

  // console.time('异步串行删除目录')
  // rmAsyncSeries(path.join(__dirname, '/3'), () => {
  //   console.timeEnd('异步串行删除目录')
  // })
}

// 7.4异步并行删除目录
{
  function reAsyncParallel (dir, callback) {
    setTimeout(() => {
      fs.stat(dir, (err, stat) => {
        if (err) return callback(err);
        // 文件夹
        if (stat.isDirectory()) {
          fs.readdir(dir, (err, files) => {
            let paths = files.map(file => path.join(dir, file));
            if (paths.length > 0) {
              let i = 0;

              function done () {
                if (++i === paths.length) {
                  fs.rmdir(dir, callback)
                }
              }

              // 并行
              paths.forEach(p => reAsyncParallel(p, done))
            } else {
              fs.rmdir(dir, callback)
            }
          })
        } else {
          fs.unlink(dir, callback)
        }
      })
    }, 0);
  }

  // console.time('异步并行删除目录')
  // reAsyncParallel(path.join(__dirname, '/4'), () => {
  //   console.timeEnd('异步并行删除目录')
  // })
}
// 7.5同步删除目录(广度优先)
{

  function rmdirAsync (dir, callback) {
    let arr = [dir];
    let index = 0;
    while (arr[index]) {
      let current = arr[index++];
      let stat = fs.statSync(current);
      if (stat.isDirectory()) {
        let dirs = fs.readdirSync(current);
        // 添加到arr会在遍历的，因此不用递归来判断了 因为他本来就是递归
        arr = [...arr, ...dirs.map(d => path.join(current, d))]
      }
    }
    let item;
    // 在这里循环，知道arr==[],不然就会删除文件，再删除文件夹，如果文件夹里面有文件的话
    while (undefined !== (item = arr.pop())) {
      let stat = fs.statSync(item);
      if (stat.isDirectory()) {
        fs.rmdirSync(item)
      } else {
        fs.unlinkSync(item)
      }
    }
    callback()
  }

  //   console.time('同步删除目录')
  //   rmdirAsync(path.join(__dirname, '/3'), () => {
  //     console.timeEnd('同步删除目录')
  //   })
}
// 7.6异步删除目录（广度优先）
{
  function rmdirWideAsync (dir, callback) {
    let dirs = [dir];
    let index = 0;

    function rmdir () {
      // 跳出条件，否则一直循环，删除文件，再删除文件夹
      let current = dirs.pop();
      if (current) {
        fs.stat(current, (err, stat) => {
          // 传入rmdir也是类似递归
          if (stat.isDirectory()) {
            fs.rmdir(current, rmdir)
          } else {
            fs.unlink(current, rmdir)
          }
        })
      }
    }

    !function next () {
      let current = dirs[index++];
      if (current) {
        fs.stat(current, (err, stat) => {
          if (err) return callback(err);
          if (stat.isDirectory()) {
            fs.readdir(current, (err, files) => {
              // 遍历整理文件和文件夹
              dirs = [...dirs, ...files.map(item => path.join(current, item))];
              next()
            })
          } else {
            next()
          }
        })
      } else {
        rmdir()
      }
    }()
  }

  // rmdirWideAsync(path.join(__dirname, '/4'), (err) => {
  //   console.log(err)
  // })
}

/* 8.遍历算法 */
/**
 * 目录是一个树状结构，在遍历时一般使用深度优先+先序遍历算法
 * 深度优先，意味着到达第一个节点后，首先接着遍历子节点而不是邻居节点
 * 先序遍历，意味着首次到达了某节点就算遍历完成，而不是最后一次返回某节点才算数
 * 因此使用这种便利方式时，下面的这棵树的遍历顺序是ABDECF
 *      A
 / \
 B   C
 / \   \
 D   E   F
 */

//  8.1同步深度优先+先序遍历算法
{
  function deepSync (dir) {
    console.log(dir);
    fs.readdirSync(dir).forEach(file => {
      let child = path.join(dir, file);
      let stat = fs.statSync(child);
      if (stat.isDirectory()) {
        deepSync(child)
      } else {
        console.log(child)
      }
    });
  }

  // deepSync(path.join(__dirname, '/3'))
}

// 8.2 异步深度优先+先序遍历
{
  function deep (dir, callback) {
    console.log(dir);
    fs.readdir(dir, (err, files) => {
      !function next (index) {
        if (index == files.length) return callback();
        let child = path.join(dir, files[index]);
        fs.stat(child, (err, stat) => {
          if (stat.isDirectory()) {
            deep(child, () => next(index + 1))
          } else {
            console.log(child);
            next(index + 1)
          }
        })
      }(0)
    })
  }

  // deep(path.join(__dirname, '/3'), () => {
  //   console.log('查询完成')
  // })
}

// 8.3 同步广度优先+先序遍历
{
  function wideSync (dir) {
    let dirs = [dir];
    while (dirs.length > 0) {
      // 广度 先入先出
      let current = dirs.shift();
      console.log(current);
      let stat = fs.statSync(current);
      if (stat.isDirectory()) {
        let files = fs.readdirSync(current);
        files.forEach(item => dirs.push(path.join(current, item)))
      }
    }
  }

  // wideSync(path.join(__dirname, '/3'), () => {
  //   console.log('查询完成')
  // })
}
// 8.4 异步广度优先+先序遍历
{
  function wide (dir, cb) {
    console.log(dir)
    cb && cb();
    fs.readdir(dir, (err, files) => {
      !function next (i) {
        if (i >= files.length) return
        let child = path.join(dir, files[i]);
        fs.stat(child, (err, stat) => {
          if (stat.isDirectory()) {
            wide(child, () => next(i + 1))
          } else {
            console.log(child)
            next(i + 1)
          }
        })
      }(0)
    })
  }

  // wide(path.join(__dirname, '/3'), () => {
  //   console.log('查询完成')
  // })
}

/* 9.path模块 */
/**
 * path是node中专门处理路径的一个模块
 * path.join将多个参数的字符串合并为一个路径字符串
 * path.basename获取一个路径中的文件名
 * path.extname 获取一个路径中的扩展名
 * path.sep 操作系统指定的文件分隔符
 * path.delimiter 属性值为系统指定的环境变量路径分隔符
 * path.normalize 将非标准化的路径字符串转化为标准路径字符串
 *  特点：可以解析.和..
 *       多个'/'合并为一个'/'
 *       在windows下'\'会成为'/'
 *       如果结尾以'/'结尾，那么久保留
 * path.resolve
 * 以应用程序根目录为起点，
 * 如果参数是普通字符串，则意思是当前目录的下级目录。
 * 如果参数是'..'就回到上级目录
 * 如果是'/'开头，表示一个绝对的根路径
 */
{
  //  a\c\
  console.log(path.normalize('./a////////b//..\\c//c///..////'));
  // 多个参数字符串合并成一个路径字符串 E:\study\step-study\9fs\a\b
  console.log(path.join(__dirname, 'a', 'b'));
  // E:\study\step-study
  console.log(path.resolve())
  // E:\study\step-study\a\c
  console.log(path.resolve('a', 'c'))
  // E:\study\step-study\9fs
  console.log(path.dirname(__filename));
  // .
  console.log(path.dirname('./fs2.js'));
  // 可以获取两个路径之间的相对关系 ..\..\..\1
  console.log(path.relative(__dirname, '/1'));
  // basename 可以获取路径中的文件名
  console.log(path.basename(__filename)); // fs2.js
  console.log(path.basename(__filename, '.js')); // fs2
  console.log(path.extname(__filename)); // .js

  // 文件分割符
  console.log(path.sep);// \
  console.log(path.win32.sep);// \
  console.log(path.posix.sep);// /
  console.log(path.delimiter);// undefined
}

/* 10.flags */
/**
 * http://nodejs.cn/api/fs.html#fs_file_system_flags
 * r  读文件，文件不存在报错
 * r+  读+写入，文件不存在报错
 * rs  同步读+忽略缓存
 * w  写文件，不存在就创建，存在则清空再写
 * wx   与 'w' 相似，但如果路径已存在则失败
 * w+  读取+写文件，不存在就创建，存在则清空再写
 * wx+  与 'w+' 相似，但如果路径已存在则失败。
 * a  追加写入
 * ax   与 'a' 相似，但如果路径已存在则失败
 * a+   打开文件用于读取和追加。如果文件不存在，则创建该文件。
 * ax+  与 'a+' 相似，但如果路径已存在则失败。
 */

 /* 11.助记 */
 /**
  * r 读 w写 s同步 +增加相反操作 x排他方式
  * r+与w+：当文件不存在的时候，r+不会创建，调用失败，但是w+会创建
  *        如果文件存在，r+不会自动清空文件，但是w+会自动清空文件
  */
