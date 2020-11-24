const esprima = require("esprima");
const estraverse = require("estraverse"); //遍历
const escodegen = require("escodegen"); //生成

let code = "function ast(){}";
let ast = esprima.parse(code);

estraverse.traverse(ast, {
  // 同一个可以有两次 进入的时候和退出的时候
  // 进入
  enter: function (node, parent) {
    console.log("enter", node.type);
    if (node.type == "Identifier") {
      node.name += "_enter";
    }
  },
  // 退出
  leave: function (node, parent) {
    console.log("leave", node.type);
    if (node.type == "Identifier") {
      node.name += "_leave";
    }
  },
});
// console.log(ast);
let result = escodegen.generate(ast);
console.log(result);
