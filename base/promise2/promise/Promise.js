const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'


// 规范兼容全部的promise
const resolvePromise = (promise2, x, resolve, reject) => {
  // 判断x的值 x promise2是不是同一个 直接报错
  if (x === promise2) {
    return reject(new TypeError('Chaining cycle detected for promise'))
  }
  // 判断数据类型 
  // typeof 不能检测对象 null
  // constructor 可以看是谁构造出来的
  // instanceOf
  // toString 不能判断实例 

  // 对象和函数
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let called;// 内部测试的时候 成功失败都会调用
    try {
      let then = x.then // 可能出错
      if (typeof then === 'function') {
        // 有then方法 就是一个promise
        //不用再次取值
        then.call(x, (y) => {
          // x y有可能还是promise--递归--直到为普通值
          // resolve(y)// promise成功结果
          if (called) {
            return
          }
          called = true;// 防止多次调用成功和失败
          resolvePromise(promise2, y, resolve, reject)
        }, (r) => {
          // reject(r)// 失败结果
          if (called) {
            return
          }
          called = true;
          reject(r)


        })
      } else {
        // 普通对象
        resolve(x)
      }
    } catch (error) {
      // 失败了还有可能调用成功
      if (called) {
        return
      }
      called = true;
      reject(error)


    }

  } else {
    // 普通值 直接成功
    resolve(x)
  }

}
class Promise {
  // 1.看属性能否在原型上使用
  // 2.是否公共  每个promise有自己的状态 不能公共

  constructor(executor) {
    this.status = PENDING //默认pending
    // 成功的值
    this.value = undefined
    // 失败的值
    this.error = undefined
    this.onResolvedCallbacks = []// 成功的回调
    this.onRejectedCallbacks = []// 失败的回调
    // 用箭头函数 保证在这里可以获取This
    let resolve = (data) => {
      // 屏蔽多次调用
      if (this.status === PENDING) {
        this.value = data
        this.status = RESOLVED
        this.onResolvedCallbacks.forEach(item => item())//发布
      }
    }
    let reject = (error) => {
      // 屏蔽多次调用
      if (this.status === PENDING) {
        this.error = error
        this.status = REJECTED
        this.onRejectedCallbacks.forEach(item => item())// 发布

      }
    }
    // 默认立即执行 兼容报错执行reject
    try {
      executor(resolve, reject)// 同步异常
    } catch (error) {
      reject(error)
    }
  }
  // then 目前有连个参数
  then (onFulfilled, onRejected) {// 异步的
    // onFulfilled, onRejected可选值  默認值
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : d => d
    onRejected = typeof onRejected === 'function' ? onRejected : d => { throw d }
    // 自己new自己 
    // 要调用resolve, reject 因此放到里面来
    let promise2 = new Promise((resolve, reject) => { //executor 立刻执行
      // 处理then 同步和异步的逻辑是一样的
      // 成功
      if (this.status === RESOLVED) {
        // 不能直接在当前执行 因此定时器
        setTimeout(() => {// 宏任务 为了保证promise2已经new玩了
          // executor之后才setTimeout 才可以拿到promise2 等执行完
          // x为执行的结果 返回新的prmise
          try {
            let x = onFulfilled(this.value)
            //  x可能为 普通值 promise throw  => 公共方法
            // 判断x的值=> 推出p2的状态  x的值和p2的关系
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0);
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            // 失败
            let x = onRejected(this.error)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0);
      }
      // 上面一段是同步
      // 下面一段是异步

      else {
        // pending
        // 是异步的话就先订阅
        this.onResolvedCallbacks.push(() => {

          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0);
        })
        this.onRejectedCallbacks.push(() => {
          // todo

          setTimeout(() => {
            try {
              // 失败
              let x = onRejected(this.error)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0);
        })
      }
    })
    // 实现链式调用 每次返回新的promise
    return promise2
  }

}


Promise.defer = Promise.deferred = () => {
  let dfd = {}

  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
module.exports = Promise
