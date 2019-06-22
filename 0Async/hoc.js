/* hoc用于批量生成函数 */

// toString() 方法返回一个表示该对象的字符串
let toString = Object.prototype.toString;
let isString = function(obj) {
  return toString.call(obj) === "[object Object]";
};
let isFunction = function(obj) {
  return toString.call(obj) === "[object Function]";
};
let isType = function(type) {
  return function(obj) {
    return toString.call(obj) === `[object ${type}]`;
  };
};

/* 可以用于需要调用多次才能执行的函数 闭包 */
let after = function(times, task) {
  return function() {
    // console.log(times,'次数')
    if (times-- == 1) {
      return task.apply(this, arguments);
    }
  };
};
// let fn = after(3, function() {
//   console.log(3);
// });
// fn();

/* 异步编程的语法目标，看起来类似同步编程
1.回调函数实现
2.事件监听
3.发布订阅
4.Promise/A+ 和生成器
5.async/await */

/* 回调 */
fs.readFile("filename", function(err, data) {
  if (err) {
    throw err;
  }
  console.log(data);
});

/* 回调的问题 */
// 1.异常
try {
  // code
} catch (error) {
  console.log(error);
}
// 但是在异步的时候，trycatch不生效
let async = function(callback) {
  try {
    setTimeout(() => {
      callback();
    }, 1000);
  } catch (e) {
    console.log(e);
  }
};
async(function() {
  throw 3;
});
// 上述代码不会生效，因为回调函数被存储起来，try只会捕获当前的循环异常，对于callback的代码无能为力
// node处理时有个约定，将异常的作为回调的第一个参数返回，如果为空就没有error
async(function(err, callback) {
  if (err) {
    console.log(err);
  }
});

/* 异步的原则
1.要传回调函数
2.出错了要向回调函数传入异常供调用者调用*/
let async = function(callback) {
  try {
    setTimeout(() => {
      if (success) {
        callback(null);
      } else {
        callback("error");
      }
    }, 1000);
  } catch (e) {
    console.log(e);
  }
};
// 回调地域
let fs = require("fs");
fs.readFile("template.txt", "utf8", function(err, template) {
  fs.readFile("data.txt", "utf8", function(err, data) {
    console.log(template + " " + data);
  });
});

/* 异步流程解决方案 */
// 1.事件发布/订阅模型
let fs = require("fs");
let EventEmitter = require("events");
let eve = new EventEmitter();
let html = {};
eve.on("ready", function(key, value) {
  html[key] = value;
  if (Object.keys(html).length === 2) {
    console.log(html);
  }
});
function render() {
  fs.readFile("template.txt", "utf8", function(err, template) {
    eve.emit("ready", "template", template);
  });
  fs.readFile("data.text", "utf8", function(err, data) {
    eve.emit("ready", "data", data);
  });
}
render();

// 2.哨兵变量 与发布订阅很类似
let fs = require("fs");
let after = function(times, callback) {
  let result = {};
  return function(key, value) {
    result[key] = result;
    if (Object.keys(result).length === times) {
      callback(result);
    }
  };
};
let done = after(2, function(result) {
  console.log(result);
});
function render() {
  fs.readFile("template.txt", "utf8", function(err, template) {
    done("template", template);
  });
  fs.readFile("data.text", "utf8", function(err, data) {
    done("data", data);
  });
}
render();

// 3.Promise/deferred模式
// 4.生成器generator/yield
// next 方法返回值的 value 属性，是 Generator 函数向外输出数据；next 方法还可以接受参数，这是向 Generator 函数体内输入数据
function* foo() {
  var index = 0;
  while (index < 2) {
    yield index++;
  }
}
// 返回的是一个迭代器
var bar = foo();
console.log(bar.next()) //{value:0,done:false}
console.log(bar.next()) //{value:1,done:false}
console.log(bar.next()) //{value:undefined,done:true}

// Co

