import p from './img/06.jpg'
// let str = require("./a.js");
// console.log('str: ', str);
console.log(1)
/******
 * -! 不会让文件再去通过pre + normal loader
 * ！ 无normal
 * !! 啥都不要
 */
class ZZ {
  constructor() {
    this.a = 1
  }
  getN () {
    return this.a
  }
}
console.log(new ZZ().getN());

let img = document.createElement('img')
img.src = p
document.body.appendChild(img)
