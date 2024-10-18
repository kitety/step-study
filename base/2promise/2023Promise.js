const FULFILLED = "fulfilled";
const REJECTED = "rejected";
const PENDING = "pending";

class MyPromise {
  #state = PENDING;
  #result = undefined;
  #handlers = [];

  constructor(executor) {
    const resolve = (data) => {
      this.#changeState(FULFILLED, data);
    };
    const reject = (reason) => {
      this.#changeState(REJECTED, reason);
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  #changeState(state, result) {
    if (this.#state !== PENDING) return;
    this.#result = result;
    this.#state = state;
    this.#run();
  }
  #isPromiseLike() {
    return true;
  }
  #runMicroTask(f) {
    queueMicrotask(f);
  }
  #runOne(callback, resolve, reject) {
    this.#runMicroTask(() => {
      if (typeof callback !== "function") {
        const settled = this.#state === FULFILLED ? resolve : reject;
        settled(this.#result);
        return;
      }
      try {
        const data = callback(this.#result);
        if (this.#isPromiseLike(data)) {
          data.then(resolve, reject);
          return;
        }
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
  #run() {
    if (this.#state !== PENDING) return;
    while (this.#handlers.length) {
      const { onFulfilled, onRejected, resolve, reject } =
        this.#handlers.shift();
      if (this.#state === FULFILLED) {
        this.#runOne(onFulfilled, resolve, reject);
      } else {
        this.#runOne(onRejected, resolve, reject);
      }
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      });
      this.#run();
    });
  }
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  finally(onFinally) {
    return this.then(onFinally, onFinally);
  }
  static resolve(value) {
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      // 处理空数组情况
      if (promises.length === 0) {
        resolve([]);
        return;
      }

      // 检查输入是否为数组
      if (!Array.isArray(promises)) {
        reject(new TypeError("Argument must be an array"));
        return;
      }

      const results = [];
      let completed = 0;
      let rejected = false;

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          (res) => {
            if (rejected) return; // 如果已经 reject,不再处理

            results[index] = res;
            completed++;
            if (completed === promises.length) {
              resolve(results);
            }
          },
          (err) => {
            if (rejected) return; // 如果已经 reject,不再处理

            rejected = true;
            reject(err);
          }
        );
      });
    });
  }
  finally(onFinally) {
    return this.then(onFinally, onFinally);
  }
}
// const p = new MyPromise((res) => {
//   res(1);
// });
// p.then(
//   (res) => {},
//   (err) => {}
// );

// console.log("p", p);
const p = new Promise((res, rej) => {
  setTimeout(() => {
    rej(1);
  }, 1000);
});
p.then(a => a, ).then(a => a, b => b).catch(err => {
  console.log('err', err)
})
