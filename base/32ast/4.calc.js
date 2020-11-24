let babel = require("@babel/core");
let types = require("@babel/types"); // 类型判断 生成ast节点

// let a = 2 * 3;
// 运算符 从右往前算
const code = "let a = 2 * 3+6+6+6+6+6+6;";
let visitor = {
  // 就是靠这个变量名匹配 一样就匹配上了
  BinaryExpression(path) {
    let node = path.node;
    if (!isNaN(node.left.value) && !isNaN(node.right.value)) {
      let result = eval(node.left.value + node.operator + node.right.value);
      result = types.numericLiteral(result);
      path.replaceWith(result);
      let parentPath = path.parentPath;
      // 多次调用 如果此表达式的父亲也是 BinaryExpression  递归计算
      //*********/
      if (parentPath.node.type === "BinaryExpression") {
        visitor.BinaryExpression.call(null, parentPath);
      }
    }
  },
};
let arrowPlugin = { visitor };
// babel内部会先转换为ast  然后遍历
let result = babel.transform(code, {
  plugins: [arrowPlugin],
});
// 拼凑
console.log(result.code);
