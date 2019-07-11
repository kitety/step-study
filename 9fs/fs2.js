/* 6.递归创建目录 */
// 6.1 同步创建目录
let fs = require('fs');
let path = require('path');
{
    function makeSync(dir) {
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
    function maked(dir, callback) {
        // path.sep提供平台特定的路径片段分隔符：
        let parts = dir.split(path.sep)
        let i = 1;
        function next() {
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
    async function mkdir(parent) {
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
    async function access(parent) {
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
    async function makePromise(dir, callback) {
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
    function rmSync(dir) {
        try {
            let stat = fs.statSync(dir);
            if (stat.isFile()) {
                fs.unlinkSync(dir)
            } else {
                let files = fs.readdirSync(dir);
                files.map(file => path.join(dir, file)).forEach(item => rmSync(item));
                fs.rmdirSync(dir)
            }
        } catch (e) {
            console.log('删除失败')
        }
    }
}
