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
  function Promise(fn) {
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

  resolve(data) {
    this.resolve(data)
  }

  reject(data) {
    this.reject(data)
  }

  then(success, error) {
    this.resolve = success;
    this.reject = error;
    console.log(this);
  }
}

//3.promise作为函数的返回值
function ajaxPromise(queryUrl) {
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
