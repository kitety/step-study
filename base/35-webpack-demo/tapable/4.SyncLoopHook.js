// let { SyncLoopHook } = require("tapable");

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

// events eventEmitter

// 当触发子事件的时候需要传入name参数，然后监听函数可以获取name参数
// 同步钩子
// let queue = new SyncHook(["name", "age"]);

// 上一个函数的返回值可以传给下一个函数
let queue = new SyncLoopHook(["name"]);
let count = 3;
let count1 = 3;
// 监听  水龙头和主管道进行连接
// 当一件事件发生出发的时候 监听函数会反复执行 返回true 继续循环 返回undefined中断
// 监听函数只有一个 不然会出问题
queue.tap("1", (name) => {
  console.log(1, name);
  if (--count) {
    return true;
  }
  return undefined;
});
// queue.tap("2", (name) => {
//   console.log(1, name);
//   if (--count1) {
//     return true;
//   }
//   return undefined;
// });

// 调用  触发事件
queue.call("kitety");
