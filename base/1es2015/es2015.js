/* 一、作用域变量 */
//变量的作用范围，以前js有全局作用域，还有一个函数作用域
// 1 var的问题，var没有块级作用域，定义在当前闭包中的都可以被访问，重名的话会覆盖当前的变量，也有可能被他人更改
if (true) {
  var a = "a";
}
console.log(a);
// for循环标记变量共享，一般在循环中的i会被共享，基本上是由于没有块级作用域造成的
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 0);
}

//2.块级作用域 用var定义变量，的时候，变量是通过闭包进行隔离的，现在用let，不仅仅可以通过闭包隔离，还增加了块级作用域，写在{}里面
if (true) {
  let name = "hello";
}
console.log(name);
// 不会污染全局对象
if (true) {
  let name = "hello";
}
console.log(window.name);
// 在for循环中也可使用
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 0);
}
// 重复定义会报错
if (true) {
  let name = "hello";
  // let name = "hello"
}
// 不存在变量的预解释，有暂时性死去dtz
for (let i = 0; i < 2; i++) {
  console.log("inner", i);
  let i = 100;
}
//闭包的新写法
(function() {})();
//现在
{
}

/* 二、常量*/
// 1.使用const声明一个常量，常量一旦赋值就不可以更改
const MY_NAME = "kitety";
//2.const限制的不能给变量重新赋值，而变量的值是可以改变的。引用类型
const names = ["hello"];
names.push("night");
// 3.不同的块级作用域可以多次定义
const A = "0";
{
  const A = "A";
  console.log(A);
}
{
  const A = "B";
  console.log(A);
}
console.log(A);

/* 三、解构赋值 */
// 1.分解一个东西的结构，可以用一个数组的方式定义n个变量，可以将一个数组中的值按照规则赋值过去
var [name, age] = ["kitety", 24];
console.log(name, age);
// 2.嵌套赋值
let [x, [y], z] = [1, [2], 3];
console.log(x, y, z);
let [x1, [y1, z1]] = [1, [2.1, 2.2]];
console.log(x1, y1, z1);
let [json, arr, num] = [
  {
    name: "zfpx"
  },
  [1, 2],
  3
];
console.log(json, arr, num);
// 3.省略赋值
let [, , a] = [1, 2, 3];
// 4.解构对象
var obj = {
  name: "kitety",
  age: 8
};
let { name, age } = obj;
let { name: myname, age: myage } = obj;
// 5.默认值
let [a = "a", b = "b", c = new Error("C必须指定")] = [1, , 3];
console.log(a, b, c);

function ajax(options) {
  var method = options.method || "get";
  var data = options.data || {};
  //.....
}

function ajax({ method = "get", data }) {
  console.log(arguments);
}

ajax({
  method: "post",
  data: {
    name: "hello"
  }
});

/* 四、字符串 */
// 1.反引号实现模板字符串拼接
var name = "kitety",
  age = 23;
let desc = `${name} is ${age} old`;
// 模板字符串的换行可以被保留
let str = `
<div>hello</div>
`;

function replace(desc) {
  return desc.replace(/\$\{([^}]+)\}/g, function(matched, key) {
    return eval(key);
  });
}

// 2.带标签的模板字符串
// 可以再模板字符串的前面增加一个标签，这个标签可以处理模板字符串，标签其实就是一个函数，函数可以接两个参数，一个参数是string，就是字符串模板里面每个部分的字符，还有一个参数可以用rest的形式values，这个参数里面就是模板字符串里面的值
var name = "kitety",
  age = 24;

function desc(strings, ...values) {
  console.log(strings, values);
}

desc`${name} is ${age} old`;
// (3) ["", " is ", " old", raw: Array(3)] (2) ["kitety", 24]
// 3.字符串新方法
/**
 * includes():boolean 返回是否找到了参数字符串，可以接第二个参数，表示开始搜索的的位置
 * startWith():boolean 返回是否以参数字符串开始，可以接第二个参数，表示开始搜索的的位置
 * endWith():boolean 返回是否以参数字符串结束，可以接第二个参数，表示结束搜索的的位置
 */
var str = "hello";
str.includes("ll", 1);
str.startWith("h", 1);
str.endWith("lo", 3);

// 4.repeat 返回一个新的字符串，表示原来的字符串重复n次
"x".repeat(3);
"x".repeat(0);

/* 五、函数 */

//1.默认参数
function ajax(url, method = "GET", dataType = "json") {
  console.log(url);
  console.log(method);
  console.log(dataType);
}

// 2.展开操作符
// 把...放在数组前面可以把一个数组进行展开，可以把一个数组传入函数而不用使用call
// 传入数组
let print = function(a, b, c) {
  console.log(a, b, c);
};
print([1, 2, 3]);
print(...[1, 2, 3]);
// 可以代替apply
var m1 = Math.max.apply(null, [1, 2, 3, 4]);
var m2 = Math.max(...[1, 2, 3, 4]);
//可以代替concat
var arr1 = [1, 3];
var arr2 = [3, 5];
var arr3 = arr1.concat(arr2);
var arr4 = [...arr1, ...arr2];
console.log(arr4);

//类数组转换为数组
function max(a, b, c) {
  return Math.max(...arguments);
}

max(1, 2, 3);
// 3.剩余操作符
// 可以将剩余的参数都放到一个数组里面
let rest = function(a, ...rest) {
  console.log(a, rest);
};
rest(1, 2, 3);
//4.解构参数
let destruct = function({ name, age }) {
  console.log(name, age);
};
destruct({
  name: "kitety",
  age: 12
});
// 5.函数的名字 es6为函数添加了一个name属性
var desc = function descname() {};
console.log(desc.name)[
  // 6.箭头函数
  //用=>来连接参数和函数体，直接返回可以用()
  // 输入参数多余一个要用()包裹，函数体多条语句用{}包裹
  (1, 2, 3)
].forEach(val => console.log(val));
//箭头函数根本没有自己的this，内部的this就是外层代码块的this。正因为没有this，从而避免了this的指向问题
var person = {
  name: "kitety",
  getName: function() {
    // setTimeout(function () {
    // this指向window
    //   console.log(this)
    // })
    setTimeout(() => {
      //this指向person
      console.log(this);
    });
  }
};
// 7.数组的新方法
//7.1 from:将一个数组或者类数组变成数组，会复制一份
let newArr = Array.from(oldArr);
//7.2 Array.of:为了将一组数值，转换为数组
console.log(Array(3), Array(3).length);
console.log(Array.of(3), Array.of(3).length);
//7.3 copyWithin
//Array.prototype.copyWithin(target,start=0,end=this.length)方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。
[1, 2, 3, 4, 5].copyWithin(0, 1, 2);
//7.4find 找到对应的元素和索引
let arr = [1, 2, 3, 4, 5];
let find = arr.find((item, index, arr) => {
  return item === 3;
});
let findIndex = arr.findIndex((item, index, arr) => {
  return item === 3;
});
console.log(find, findIndex);
//7.5 fill 填充数组
let arr = [1, 2, 3, 4, 5, 6];
arr.fill("a", 1, 2);
console.log(arr);
//map reduce filter forEach

/*六、对象*/
//1.对象字面量
//对象的键值同名
{
  let name = "kitety";
  let age = 8;
  let getName = function() {
    console.log(this.name);
  };
  let person = {
    name,
    age,
    getName
  };
}
//2.Object.is()比较两个值是否相等
console.log(Object.is(NaN, NaN));
//Object.assign()
//把多个对下个属性复制到一层对象中，第一个参数是复制的对象，从第二个参数开始往后，都是复制的源对象
{
  var nameObj = {
    name: "kitety"
  };
  var ageObj = {
    age: 8
  };
  var obj = {};
  Object.assign(obj, nameObj, ageObj);
  console.log(obj);

  //克隆对象
  function clone(obj) {
    return Object.assign({}, obj);
  }
}
//4.Object.setPrototypeOf 将一个指定的对象的原型设置为一个对象非或者null
{
  var obj1 = {
    name: "kitety"
  };
  var obj2 = {
    name: "hello"
  };
  var obj = {};
  Object.setPrototypeOf(obj, obj1);
  console.log(obj.name);
  console.log(Object.getPrototypeOf(obj));
}
//5.proto 直接在对象表达式中设置prototype
{
  var obj1 = -{
    name: "kitety"
  };
  var obj3 = {
    __proto__: obj1
  };
  console.log(obj3.name);
  console.log(Object.getPrototypeOf(obj3));
}
//6.super可以调用prototype上的属性和方法
{
  let person = {
    eat() {
      return "milk";
    }
  };
  let student = {
    __proto__: person,
    eat() {
      return super.eat() + "bread";
    }
  };
  console.log(student.eat());
}

/*七、类*/
//1.class 使用class关键字定义一个类，基于这个类创建的实例以后会自动执行constructor方法，此方法可以用来初始化
{
  class Person {
    constructor(name) {
      this.name = name;
    }

    getName() {
      return this.name;
    }
  }

  let p = new Person("kitety");
  p.getName();
}
//2.get和set
//getter可以用来获取属性，setter可以用来设置属性
{
  class Person {
    constructor() {
      this.hobbies = [];
    }
    set hobby(hobby) {
      this.hobbies.push(hobby);
    }
    get hobby() {
      return this.hobbies;
    }
  }
  let p = new Person();
  p.hobby = "pingpang";
  p.hobby = "pingpang2";
  console.log(p.hobby);
}
//3.静态方法 static，不需要实例化就可以使用的方法
{
  class Person {
    static add(a, b) {
      return a + b;
    }
  }
}
//4.extends 继承
{
  class Person {
    constructor(name) {
      this.name = name;
    }
  }
  class Teacher extends Person {
    constructor(name, age) {
      super(name);
      this.age = age;
    }
  }
  var teacher = new Teacher("kitety", 23);
  console.log(teacher.age);
}

/* 生成器与迭代器 */
// generator是一个特殊的函数，执行他会返回一个iterator对象。通过遍历迭代器，generator函数运行之后将会返回一个遍历器对象，而不是普通函数的返回值
// 1.Iterators模拟
// 迭代器有一个next方法，没次执行的时候将会返回一个对象，对象里面有两个属性，一个是value代表返回的值，一个是done布尔值。
function buy(books) {
  let i = 0;
  return {
    next() {
      let done = i == books.length;
      let value = !done ? books[i++] : undefined;
      return {
        done,
        value
      };
    }
  };
}
let iterators = buy(["js", "html"]);
var curr;
do {
  curr = iterators.next();
  console.log(curr);
} while (!curr.done);
// 2.Generators 生成器用于创建迭代器
function* buy(books) {
  for (let i = 0; i < books.length; i++) {
    yield books[i];
  }
}
var b = buy(["js", "html"]);
var curr;
do {
  curr = b.next();
  console.log(curr);
} while (!curr.done);

/* 九.集合 */
// 1.一个Set就是一堆东西的集合，不过跟数组不一样，Set里面不能有重复的值
var books = new Set();
// 添加
books.add("js");
books.add("html");
books.add("js");
books.forEach(function(book) {
  console.log(book);
});
console.log(books.size);
// 判断
console.log(books.has("js"));
// 删除
books.delete("js");
console.log(books.size);
console.log(books.has("js"));
// 清空
books.clear();

// 2.map 可以使用Map来组织这种名值对的数据
var books = new Map();
books.set("js", {
  name: "js"
}); //向map中添加元素
books.set("html", {
  name: "html"
}); //向map中添加元素
console.log(books.size);
console.log(books.get("js"));
books.delete("js");
console.log(books.has("js"));
books.forEach((value, key) => {
  console.log(value, key);
});

/* 十、模块 */
// 根据应用的需求吧代码分成不同的模块，每个模块里面可以导出其他模块使用的模块，其他模块可以导入这些模块
// 1.模块 导出
export var name = "kitety";
export var age = 23;
// 导入
import * as school from "./school.js";
// 页面中引用
// <script src="https://google.github.io/traceur-compiler/bin/traceur.js"></script>
//   <script src="https://google.github.io/traceur-compiler/bin/BrowserSystem.js"></script>
//   <script src="https://google.github.io/traceur-compiler/src/bootstrap.js"></script>
//   <script type="module" src="index.js"></script>

// 2.重命名
// 导出时重命名
function say() {
  console.log("say");
}
export { say as say2 };
// 导入时重命名
import say from "./school.js";

/* 十一、深拷贝 */
{
  function extend(parent) {
    let child;
    if (Object.prototype.toString.call(parent) === "[object Object]") {
      child = {};
      for (const key in parent) {
        if (parent.hasOwnProperty(key)) {
          child[key] = extend(parent[key]);
        }
      }
    } else if (Object.prototype.toString.call(parent) === "[object Array]") {
      child = parent.map(item => extend(item));
    } else {
      return parent;
    }
    return child;
  }
  function extendDeep(parent, child) {
    child = child || {};
    for (const key in parent) {
      if (typeof parent[key] === "object") {
        child[key] =
          Object.prototype.toString.call(parent[key]) === "[object Array]"
            ? []
            : {};
        extendDeep(parent[key], child[key]);
      } else {
        child[key] = parent[key];
      }
    }
    return child;
  }
  var parent = {
    age: 5,
    hobby: [1, 2, 3],
    home: {
      city: "cd"
    },
    c: function() {
      console.log("SSSS");
    }
  };
  var child = extend(parent);
  var child2 = extendDeep(parent);
}
