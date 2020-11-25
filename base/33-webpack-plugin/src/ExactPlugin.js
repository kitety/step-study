// import { flatten } from "lodash";
// import flatten from "lodash/flatten";

let babel = require("@babel/core");
let types = require("@babel/types");

console.log(1);
// 只处理 ImportDeclaration
let visitor = {
  ImportDeclaration(path) {
    let node = path.node;
    let specifiers = node.specifiers; // 是个数组
    // import UI from 'xxx-ui'; 这种
    const isImportDefaultSpecifier = types.isImportDefaultSpecifier(
      specifiers[0]
    );
    if (!isImportDefaultSpecifier && node.source.value === "lodash") {
      let newImportSpecifiers = specifiers.map((specifier) => {
        return types.importDeclaration(
          [types.importDefaultSpecifier(specifier.local)],
          types.stringLiteral(`${node.source.value}/${specifier.local.name}`)
        );
      });
      path.replaceWithMultiple(newImportSpecifiers);
    }
  },
};
let result = babel.transform("import { flatten } from 'lodash' ", {
  plugins: [{ visitor }],
});
// 拼凑
console.log(result.code);
