/* 一、作用域变量 */
//变量的作用范围，以前js有全局作用域，还有一个函数作用域
// 1 var的问题，var没有块级作用域，定义在当前闭包中的都可以被访问，重名的话会覆盖当前的变量，也有可能被他人更改
if (true) {
  var a = 'a'
}
console.log(a)
// for循环标记变量共享，一般在循环中的i会被共享，基本上是由于没有块级作用域造成的
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i)
  }, 0)
}

//2.块级作用域 用var定义变量，的时候，变量是通过闭包进行隔离的，现在用let，不仅仅可以通过闭包隔离，还增加了块级作用域，写在{}里面
if (true) {
  let name = "hello"
}
console.log(name)
// 不会污染全局对象
if (true) {
  let name = "hello"
}
console.log(window.name)
// 在for循环中也可使用
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i)
  }, 0)
}
// 重复定义会报错
if (true) {
  let name = "hello"
  // let name = "hello"
}
// 不存在变量的预解释，有暂时性死去dtz
for (let i = 0; i < 2; i++) {
  console.log('inner', i);
  let i = 100;
}
//闭包的新写法
; (function () {
})()
//现在
{
}

/* 二、常量*/
// 1.使用const声明一个常量，常量一旦赋值就不可以更改
const MY_NAME = 'kitety'
//2.const限制的不能给变量重新赋值，而变量的值是可以改变的。引用类型
const names = ['hello']
names.push('night')
// 3.不同的块级作用域可以多次定义
const A = "0";
{
  const A = "A";
  console.log(A)
}
{
  const A = "B";
  console.log(A)
}
console.log(A)

/* 三、解构赋值 */
// 1.分解一个东西的结构，可以用一个数组的方式定义n个变量，可以将一个数组中的值按照规则赋值过去
var [name, age] = ['kitety', 24]
console.log(name, age);
// 2.嵌套赋值
let [x, [y], z] = [1, [2], 3]
console.log(x, y, z);
let [x1, [y1, z1]] = [1, [2.1, 2.2]];
console.log(x1, y1, z1);
let [json, arr, num] = [{ name: 'zfpx' }, [1, 2], 3];
console.log(json, arr, num);
// 3.省略赋值
let [, , a] = [1, 2, 3]
// 4.解构对象
var obj = { name: 'kitety', age: 8 }
let { name, age } = obj
let { name: myname, age: myage } = obj
// 5.默认值
let [a = "a", b = "b", c = new Error('C必须指定')] = [1, , 3];
console.log(a, b, c);

function ajax (options) {
  var method = options.method || "get";
  var data = options.data || {};
  //.....
}

function ajax ({ method = "get", data }) {
  console.log(arguments);
}

ajax({
  method: "post",
  data: { "name": "hello" }
});

/* 四、字符串 */
// 1.反引号实现模板字符串拼接
var name = 'kitety', age = 23;
let desc = `${name} is ${age} old`
// 模板字符串的换行可以被保留
let str = `
<div>hello</div>
`

function replace (desc) {
  return desc.replace(/\$\{([^}]+)\}/g, function (matched, key) {
    return eval(key)
  })
}

// 2.带标签的模板字符串
// 可以再模板字符串的前面增加一个标签，这个标签可以处理模板字符串，标签其实就是一个函数，函数可以接两个参数，一个参数是string，就是字符串模板里面每个部分的字符，还有一个参数可以用rest的形式values，这个参数里面就是模板字符串里面的值
var name = 'kitety', age = 24

function desc (strings, ...values) {
  console.log(strings, values);
}

desc`${name} is ${age} old`
// (3) ["", " is ", " old", raw: Array(3)] (2) ["kitety", 24]
// 3.字符串新方法
/**
 * includes():boolean 返回是否找到了参数字符串，可以接第二个参数，表示开始搜索的的位置
 * startWith():boolean 返回是否以参数字符串开始，可以接第二个参数，表示开始搜索的的位置
 * endWith():boolean 返回是否以参数字符串结束，可以接第二个参数，表示结束搜索的的位置
 */
var str = 'hello'
str.includes('ll', 1)
str.startWith('h', 1)
str.endWith('lo', 3)

// 4.repeat 返回一个新的字符串，表示原来的字符串重复n次
'x'.repeat(3);
'x'.repeat(0);

/* 五、函数 */

//1.默认参数
function ajax (url, method = 'GET', dataType = 'json') {
  console.log(url)
  console.log(method)
  console.log(dataType)
}

// 2.展开操作符
// 把...放在数组前面可以把一个数组进行展开，可以把一个数组传入函数而不用使用call
// 传入数组
let print = function (a, b, c) {
  console.log(a, b, c);
}
print([1, 2, 3])
print(...[1, 2, 3])
// 可以代替apply
var m1 = Math.max.apply(null, [1, 2, 3, 4])
var m2 = Math.max(...[1, 2, 3, 4])
//可以代替concat
var arr1 = [1, 3]
var arr2 = [3, 5]
var arr3 = arr1.concat(arr2)
var arr4 = [...arr1, ...arr2]
console.log(arr4)
//类数组转换为数组
function max (a, b, c) {
  return Math.max(...arguments)
}
max(1, 2, 3)
// 3.剩余操作符
// 可以将剩余的参数都放到一个数组里面
let rest = function (a, ...rest) {
  console.log(a, rest);
}
rest(1, 2, 3)
