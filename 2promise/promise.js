/*一、异步回调*/
//1.回调地狱
//需要个操作的时候，多个回调函数嵌套形成回调地狱
//2.并行结果
//如果几个异步操作之间没有前后顺序，但是需要等到多个异步操作完成再执行其他任务，这就因为无法并行执行来节约时间。

/*二、Promise*/
//promise异步操作之后过段时间承诺做的事情，比如网络请求、读取本地文件等等

/*三、Promise三种状态*/
/*
* 1.pending promise 对象实例创建的时候的出事状态
* 2.fulfilled成功状态
* 3.rejected 失败状态
* then:用来制定promise对象状态改变时确定执行的操作，第一个为成功调用的函数，第二个为失败调用的函数*/

/*四、构造一个Promise*/
//1.使用promise
{
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve('This is resolve')
      } else {
        reject('This is resolve')
      }
    }, 1000)
  })
  promise.then(Fulfilled, Rejected)
}
/*
* 构造一个promise需要给Promise传入一个函数
* 传入的函数有两个形参，都是function类型
* 第一个形参是执行成功的操作，第二个是执行失败的操作*/

//2.使用es5模拟Promise
{
  function Promise (fn) {
    fn(data => {
      this.resolve(data)
    }, err => {
      this.reject(err)
    })
  }

  Promise.prototype.resolve = data => {
    this.resolve(data)
  }
  Promise.prototype.reject = error => {
    this.resolve(error)
  }
  Promise.prototype.then = (success, error) => {
    this.resolve = success
    this.reject = error
  }
}

//3.使用es6模拟promise
class Promise {
  constructor(fn) {
    fn(data => {
      this.resolve(data)
    }, err => {
      this.reject(err)
    })
  }

  resolve (data) {
    this.resolve(data)
  }

  reject (data) {
    this.reject(data)
  }

  then (success, error) {
    this.resolve = success;
    this.reject = error;
    console.log(this);
  }
}

/* 五、promise作为函数的返回值 */
function ajaxPromise (queryUrl) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', queryUrl, true);
    shr.send(null);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText)
        } else {
          reject(xhr.responseText)
        }
      }
    }
  })
}
ajaxPromise('https://www.baidu.com')
  .then((value) => {
    console.log(value);
  })
  .catch((err) => {
    console.error(err);
  });

/* 六、promise的链式调用 */
// 每次调用返回的都是一个新的Promise实例，链式调用的参数通过返回值传递
// then可以使用链式调用的写法在于，每一次执行该方法返回一个Promise对象
{
  readFile('./promise.js').then(data => {
    console.log(data);
    return data;
  }).then(data => {
    console.log(data);
    return data;
  }).then(data => {
    console.log(data);
    return data;
  })
}

/* 七、、Promise Api */
/**
 * 1.Promise.all
 * @params promise实例的数组
 * @return 一个promise实例，状态取决于数组的状态，数组中的实例全部resolve，此时才为resolve，否则为reject
 */
{
  Promise.all([p1, p2]).then(res => console.log(res)).catch(e => console.error(e))
  // 不管两个promise谁先完成，Promise.all方法会按照数组里面的顺序将结果返回
}

/**
 * 2.Promise.race
 * @params promise实例的数组
 * @return 一个promise实例，状态取决于第一个请求成功的状态，第一个请求resolve，此时才为resolve，否则为reject
 */
{
  Promise.all([p1, p2]).then(res => console.log(res)).catch(e => console.error(e))
  // 不管两个promise谁先完成，Promise.all方法会按照数组里面的顺序将结果返回
}

/**
 * 3.Promise.resolve
 * @params 
 * 传入不同参数头不同的功能
 * 值(对象，数组，字符串)：作为resolve传递出去的值
 * promise实例：原封不动返回
 * @return 返回一个promise实例，这个实例处于resolve状态
 */

/**
 * 4.Promise.reject
 * @params 抛出的错误信息
 * @return 返回一个promise实例，这个实例处于reject状态
 */

/* 八、q */
// q是一个在js中实现promise的模块

// 1.q的使用方法
{
  var Q = require('q')
  var fs = require('fs')
  function read (filename) {
    var deferred = Q.defer();
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        deffered.reject(err)
      } else {
        deffered.resolve(data)
      }
    })
    return deffered.promise
  }
  read('./promise.js').then(data => {
    console.log(data)
  }, err => {
    console.log(err)
  })
}

// 2.q的简单实现
{
  module.export = {
    defer () {
      var _success, _error;
      return {
        resolve (data) {
          _success(data)
        },
        reject (data) {
          _error(data)
        },
        promise: {
          then (success, error) {
            _success = success;
            _error = error;
          }
        }
      }
    }
  }
}

/* 3.q的实现 */
// https://div.io/topic/1351
{
  var defer = function () {
    var pending = [], value;
    return {
      resolve: function (_value) {
        if (pending) {
          value = _value;
          for (let ii = 0; ii < pending.length; ii++) {
            const callback = pending[ii];
            callback(value)
          }
          pending = undefiend
        }
      },
      promise: {
        then: function (callback) {
          if (pending) {
            pending.push(callback)
          } else {
            callback(value)
          }
        }
      }
    }
  }
}

/* 九.bluebird */
// https://www.ibm.com/developerworks/cn/web/wa-lo-use-bluebird-implements-power-promise/index.html
// 实现promise标准的库功能最全，速度最快的一个库

// 1.bluebird经典使用
{
  let Promise = require('./bluebird')
  // Promise.promisify转换为带有then格式的
  let readFile = Promise.promisify(require('fs').readFile)
  readFile('./promise.js').then((result) => {
    console.log(result)
  }).catch((err) => {
    console.log(err);
  });
  let fs = Promise.promisfiyAll(require('fs'));
  fs.readFileAsync('./promise.js', 'utf8').then((result) => {
    console.log(result)
  }).catch((err) => {
    console.log(err);
  });
}

// 2.bluebird的简单实现
{
  module.exports = {
    promiseify (fn) {
      return function () {
        let args = Array.from(arguments);
        return new Promise((resolve, reject) => {
          fn.apply(null, args.concat(err => {
            if (err) {
              reject(err)
            } else {
              resolve(err)
            }
          }))
        })

      }
    },
    promiseifyAll (obj) {
      for (const attr in obj) {
        if (obj.hasOwnProperty(attr) && typeof obj[attr] === 'function') {
          obj[attr + 'Async'] = this.promiseify(obj[attr])
        }
      }
      return obj
    }
  }
}

/* 十、co */
