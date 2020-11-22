// finally 最终的  trycatch finally
// 不论成功和失败都会执行 返回一个promise实例 实例上的方法
// then的别名 成功失败都会调用

let p = new Promise((resolve, reject) => {
  reject(100);
});
/**
 * 1.普通值  包装成promise   如果放的是promise 等待这个promise执行完后再继续执行
 */
/**
 * Promise.race catch try
 */
// Promise.resolve(1).then((d) => {
//   console.log("====================================");
//   console.log(1);
//   console.log("====================================");
// });

// Promise.resolve.finally = function (cb) {
//   return p.then(
//     (d) => Promise.resolve(cb()).then(() => d),
//     (e) =>
//       Promise.resolve(cb()).then(() => {
//         throw e;
//       })
//   );
// };
// Promise resolve的实现
Promise.prototype.finally = function (cb) {
  return p.then(
    (data) => {
      // cb(); // finally传入的函数成功失败都会调用
      // cb返回的是一个promise，那么   Promise.resolve就会等待Promise执行完成   返回的也是promise实例
      return Promise.resolve(cb()).then(() => d);
      // return data; // 成功 走到下一个then的成功里
    },
    (e) => {
      // cb();
      // // 进入reject throw
      // throw e;
      return Promise.resolve(cb()).then(() => {
        throw e;
      });
    }
  );
};
p.finally((d) => {
  console.log("最终的", d);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });
})
  .then((d) => {
    console.log(d);
  })
  .catch((e) => {
    console.log(111, e);
  });

// generator co
