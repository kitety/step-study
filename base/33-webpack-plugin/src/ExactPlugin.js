// import { flatten } from "lodash";
// import flatten from "lodash/flatten";

let babel = require("@babel/core");
let types = require("@babel/types");

// 只处理 ImportDeclaration
let visitor = {
  ImportDeclaration(path) {
    let node = path.node;
    let specifiers = node.specifiers; // 是个数组
    // import UI from 'xxx-ui'; 这种
    const isImportDefaultSpecifier = types.isImportDefaultSpecifier(
      specifiers[0]
    );
    // import * as UI from 'xxx-ui'; 这种
    const isImportNamespaceSpecifier = types.isImportNamespaceSpecifier(
      specifiers[0]
    );
    if (!isImportDefaultSpecifier || !isImportNamespaceSpecifier) {
     let newImportSpecifiers = specifiers.map(specifier=>{
       
     });
    }
  },
};
