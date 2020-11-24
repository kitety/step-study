let babel = require("@babel/core");
let types = require("@babel/types"); // 类型判断 生成ast节点

/**
 * 访问者模式Visitor 对于某个对象，不同的访问者，产生不同的结果，执行操作也不一样
 */

const code = "const sum =(a,b)=>a+b";
// let sum=function(a,b){return a+b}

// 这个访问者可以对特定类型的节点处理
let visitor = {
  // 就是靠这个变量名匹配 一样就匹配上了
  ArrowFunctionExpression(path) {
    // 路径  每个属性都是一个路径 也可以写对象 enter leave
    // ArrowFunctionExpression
    let params = path.node.params; // 取出参数用node
    let async = path.node.async;
    let body = path.node.body;
    let returnStatement = types.returnStatement(body);
    let blockStatement = types.blockStatement([returnStatement]);
    let func = types.functionExpression(
      null,
      params,
      blockStatement,
      false,
      async
    );
    path.replaceWith(func);
  },
};
let arrowPlugin = { visitor };
// babel内部会先转换为ast  然后遍历
let result = babel.transform(code, {
  plugins: [arrowPlugin],
});
// 拼凑
console.log(result.code);
