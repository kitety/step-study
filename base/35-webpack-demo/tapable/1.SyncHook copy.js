let { SyncHook } = require("tapable");

// class SyncHook {
//   constructor(arr) {
// this.arr = arr;
//     this.hooks = [];
//   }
//   tap(name, fn) {
//     this.hooks.push(fn);
//   }
//   call() {
//     this.hooks.forEach((hook) => {
//       hook(...arguments);
//     });
//   }
// }

// events eventEmitter

// 当触发子事件的时候需要传入name参数，然后监听函数可以获取name参数
// 同步钩子
let queue = new SyncHook(["name", "age"]);
// let queue = new SyncBailHook(["name", "age"]);
// 监听  水龙头和主管道进行连接 可以获取主管道的资源
queue.tap("1", (name, age) => {
  console.log(1, name, age);
});
queue.tap("2", (name, age) => {
  console.log(2, name, age);
});
queue.tap("3", (name, age) => {
  console.log(3, name, age);
});
// 调用  触发事件
queue.call("kitety", 10);
