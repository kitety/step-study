let { AsyncParallelHook } = require("tapable");

class SyncLoopHook {
  constructor(arr) {
    this.arr = arr;
    this.hook;
  }
  tap(name, fn) {
    this.hook = fn;
  }
  call() {
    let result = true;
    while (result) {
      result = this.hook(...arguments);
    }
  }
}

let queue = new AsyncParallelHook3(["name"]);
// 异步并发执行
console.time("cost");
queue.tapPromise("1", function (name) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      console.log(1, name);
      resolve();
    }, 1000);
  });
});
queue.tapPromise("2", function (name) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      console.log(2, name);
      resolve();
    }, 2000);
  });
});
queue.tapPromise("3", function (name) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      console.log(3, name);
      resolve();
    }, 3000);
  });
});
queue.promise("kitety").then(
  () => {
    console.log("结束");
    // 都完成了才完成
    console.timeEnd("cost"); // 异步就有回调  需要调用
  },
  () => {
    console.log("失败结束");
    // 都完成了才完成
    console.timeEnd("cost"); // 异步就有回调  需要调用
  }
);
// queue.callAsync(10, () => {
//   console.log("结束");
//   // 都完成了才完成
//   console.timeEnd("cost"); // 异步就有回调  需要调用
// });

// 第二种 tapAsync
// console.time("cost");
// queue.tapAsync("1", function (name, cb) {
//   setTimeout(() => {
//     console.log(1, name);
//     cb();
//   }, 1000);
// });
// queue.tapAsync("2", function (name, cb) {
//   setTimeout(() => {
//     console.log(2, name);
//     cb();
//   }, 2000);
// });
// queue.tapAsync("3", function (name, cb) {
//   setTimeout(() => {
//     console.log(3, name);
//     cb(); // 调用才会通知结束
//   }, 3000);
// });
// queue.callAsync(10, () => {
//   console.log("结束");
//   // 都完成了才完成
//   console.timeEnd("cost"); // 异步就有回调  需要调用
// });

// 第一种 直接tap
// console.time("cost");
// queue.tap("1", function (name) {
//   console.log(1, name);
// });
// queue.tap("2", function (name) {
//   console.log(2, name);
// });
// queue.tap("3", function (name) {
//   console.log(3, name);
// });
// queue.callAsync(10, () => {
//   console.log("结束");
//   console.timeEnd("cost");
// });

class AsyncParallelHook1 {
  constructor() {
    this.taps = [];
  }
  tap(name, fn) {
    this.taps.push(fn);
  }
  callAsync() {
    let args = Array.from(arguments);
    let callback = args.pop();
    this.taps.forEach((fn) => fn(...args));
    callback();
  }
}
class AsyncParallelHook2 {
  constructor() {
    this.taps = [];
  }
  tapAsync(name, fn) {
    this.taps.push(fn);
  }
  callAsync() {
    let args = Array.from(arguments);
    let callback = args.pop();
    let i = 0,
      length = this.taps.length;
    function done(err) {
      if (++i == length) {
        callback(err);
      }
    }
    this.taps.forEach((fn) => {
      fn(...args, done);
    });
  }
}
class AsyncParallelHook3 {
  constructor() {
    this.taps = [];
  }
  tapPromise(name, fn) {
    this.taps.push(fn);
  }
  promise() {
    let args = Array.from(arguments);
    let promises = this.taps.map((fn) => fn(...args));
    return Promise.all(promises);
  }
}
