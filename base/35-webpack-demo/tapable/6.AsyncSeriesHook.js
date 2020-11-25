let { AsyncSeriesHook } = require("tapable");
class AsyncSeriesHook1 {
  constructor() {
    this.hooks = [];
  }
  tapAsync(name, fn) {
    this.hooks.push(fn);
  }
  callAsync() {
    let args = Array.from(arguments);
    let callback = args.pop();

    let idx = 0;
    let that = this;
    function next() {
      // 这样实现的一个个执行
      let fn = that.hooks[idx++];
      fn ? fn(...args, next) : callback();
    }
    next();
  }
}
let queue = new AsyncSeriesHook1(["name"]);
console.time("cost");
queue.tapAsync("1", function (name, cb) {
  setTimeout(() => {
    console.log(1, name);
    cb();
  }, 1000);
});
queue.tapAsync("2", function (name, cb) {
  setTimeout(() => {
    console.log(2, name);
    cb();
  }, 2000);
});
queue.tapAsync("3", function (name, cb) {
  setTimeout(() => {
    console.log(3, name);
    cb(); // 调用才会通知结束
  }, 3000);
});
// 串行的时间不一样  一个结束 另一个才开始
queue.callAsync(10, () => {
  console.log("结束");
  // 都完成了才完成
  console.timeEnd("cost"); // 异步就有回调  需要调用
});
