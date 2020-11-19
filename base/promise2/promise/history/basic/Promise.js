const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

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
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  // then 目前有连个参数
  then (onFulfilled, onRejected) {
    // 成功
    if (this.status === RESOLVED) {
      onFulfilled(this.value)
    } else if (this.status === REJECTED) {
      // 失败
      onRejected(this.error)
    }
    // 上面一段是同步
    // 下面一段是异步

    else {
      // pending
      // 是异步的话就先订阅
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value)
      })
      this.onRejectedCallbacks.push(() => {
        // todo
        onRejected(this.error)
      })
    }
  }

}
module.exports = Promise
