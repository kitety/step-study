/* 1.使用console代表控制台 */
// console.log('log')
// console.info('info')
// console.error('error')
// console.warn('warn')
// console.dir
// console.time
// console.tiemEnd
// console.trace
// console.log

/* 2.全局作用域 */
/**
 * 全局作用域global指的是不需要加载任何模块就可以使用的变量、函数、类
 * 定义全局变量会成为global的属性
 * 不要使用clear关键字，全局污染
 * setTimeout clearTimeout
 * setInterval clearInterval
 * unref和ref
 */
{
  // let test = function () {
  //     console.log('callback')
  // }
  // let timer = setInterval(() => {
  //     test
  // }, 1000);
  // timer.unref();
  // setTimeout(() => {
  //     timer.ref();
  // }, 3000);
}

/* 3.函数 */
/**
 * require
 * 模块加载过程
 * require.resolve供外部调用，用于从模块名取到绝对路径
 * 模板缓存(require.cache);
 * require.main
 * 模块导出
 */
// module.exports require module filename dirname

/* 4.process */
// 4.1在nodejs里，process代表nodejs应用程序，可以获取应用程序的用户，运行环境等各种信息
{
  // process.argv.forEach(item => {
  //   console.log(item);
  // })
  // process.on('exit', () => {
  //   console.log('clear');
  // })
  // process.on('uncaughtException', err => {
  //   console.log(err);
  // })
  // console.log(process.memoryUsage())// 内存使用情况，单位为字节
  // console.log(process.cwd())//获得当前执行node命令时候的文件夹目录名
  // console.log(__dirname)//获得当前执行文件所在目录的完整目录名
  // process.chdir('..') // 目录改变
  // console.log(process.cwd())

  function err () {
    throw new Error('错误')
  }
  // err()
}

// 4.2process.nextTick & setImmediate
/**
 * process.nextTick方法将callback添加到next tick队列，一旦当前时间轮训队列的任务全部完成，在next tick队列中的所有的任务将会依次调用
 * setImmediate预定立即执行callback，他是在IO事件的回调之后触发
 */
{
  // next 123456
  // https://www.zhihu.com/question/23028843 setImmediate在后面
  setImmediate(function () {
    console.log('4');
  });
  setImmediate(function () {
    console.log('5');
  });
  process.nextTick(function () {
    console.log(1);
    process.nextTick(function () {
      console.log(2);
      process.nextTick(function () {
        setImmediate(function () {
          console.log('6');
        });
        console.log(3);
      })
    })
  })
  console.log('next');
}

/* 5.EventEmitter */
/**
 * 在nodejs的用于实现各种时间处理的event模块中，定义了EventEmitter类。所以可能触发事件的对象都是继承自一个EventEmitter类的子类实例对象
 */
/**
 * 方法名和参数                       描述
 * addListener(event,listener)      对指定事件绑定事件处理函数
 * onListener(event,listener)      对指定事件绑定事件处理函数
 * once(event,listener)      对指定事件绑定事件只执行一次的处理函数
 * removeListener(event,listener)      对指定事件解除事件处理函数
 * removeAllListeners([event])      对指定事件解除所有的事件处理函数
 * setMaxListeners(n)              指定事件处理函数的最大值，n为整数，代表最大的可指定的事件处理函数的数量
 * listeners(event)                 获取指定事件的所有事件处理函数
 * emit(event[,arg1][,arg2])        手动触发事件
 */
{
  let EventEmitter = require('./event')
  let util = require('util')
  util.inherits(Bell, EventEmitter);
  function Bell () {
    EventEmitter.call(this)
  }
  let bell = new Bell();
  bell.on('newListener', function (type, listener) {
    console.log(`对${type} 新增事件 ${listener}`);
  })
  bell.on('removeListener', function (type, listener) {
    console.log(`对${type} 删除事件 ${listener}`);
  })
  function teacher (thing) {
    console.log(`老师带着${thing}进入教室`);
  }
  function student (thing) {
    console.log(`学生带着${thing}进入教室`);
  }
  function master (thing) {
    console.log(`校长带着${thing}进入教室`);
  }
  bell.on('ring', teacher)
  bell.on('ring', student)
  bell.once('ring', master)
  bell.emit('ring', 'book')
  bell.removeAllListeners('ring')
  bell.emit('ring', 'book')

  // util测试
  console.log(util.inspect({ name: 'kitety' }));// 是一个将任意对象转换 为字符串的方法，通常用于调试和错误输出
  console.log(util.isArray([2]));
  console.log(util.isRegExp(/\d/));
  console.log(util.isDate(new Date()));
  console.log(util.isError(new Error()));
}

/* 6.node断点调试 */
// 在vsc设置断电即可
{
  var a = 'a';
  debugger
  a += 'b'
}
