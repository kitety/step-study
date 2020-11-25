// let { SyncWaterfallHook } = require("tapable");

class SyncWaterfallHook {
  constructor(arr) {
    this.arr = arr;
    this.hooks = [];
  }
  tap(name, fn) {
    this.hooks.push(fn);
  }
  call() {
    let result;
    for (var i = 0; i < this.hooks.length; i++) {
      let hook = this.hooks[i];
      result = i === 0 ? hook(...arguments) : hook(result);
    }
  }
}

// events eventEmitter

// 当触发子事件的时候需要传入name参数，然后监听函数可以获取name参数
// 同步钩子
// let queue = new SyncHook(["name", "age"]);

// 上一个函数的返回值可以传给下一个函数
let queue = new SyncWaterfallHook(["name"]);
// 监听  水龙头和主管道进行连接 可以获取主管道的资源
queue.tap("1", (name) => {
  console.log(1, name);
  return "111";
});
queue.tap("2", (data) => {
  console.log(2, data);
  return "222";
});
queue.tap("3", (data) => {
  console.log(3, data);
});
// 调用  触发事件
queue.call("kitety");
