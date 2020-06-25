const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const path = require("path");
const babel = require("@babel/core");

let ID = 0;

function createAssets(filename) {
  const content = fs.readFileSync(filename, "utf-8");

  //1. parser
  const ast = parser.parse(content, { sourceType: "module" });

  console.log(`\n\n\n**************** AST for ${filename}********************`);
  console.log(JSON.stringify(ast, null, 2));
  console.log(`\n**************** End  AST${filename}********************`);

  const dependencies = [];

  //2. traverse
  traverse(ast, {
    //3. babel-types
    ImportDeclaration: function ({ node }) {
      dependencies.push(node.source.value);
    }
  });

  //4. babel/core
  const { code } = babel.transformFromAstSync(ast, null, {
    //5. presets
    presets: ["@babel/preset-env"]
  });

  console.log(`\n\n\n**************** code  for ${filename}********************`);
  console.log(JSON.stringify(code, null, 2));
  console.log(`\n**************** End  code ${filename}********************`);


  return {
    filename,
    dependencies,
    id: ID++,
    code
  };

}

function createGraph(entry) {
  const mainAsset = createAssets(entry);
  const queue = [mainAsset];
  for (const asset of queue) {
    const dirname = path.dirname(asset.filename);
    asset.mapping = {};
    asset.dependencies.forEach(relativePath => {
      const absolutePath = path.join(dirname, relativePath);
      const child = createAssets(absolutePath);
      asset.mapping[relativePath] = child.id;
      queue.push(child);
    });
  }
  return queue;
}
function bundle(graph) {

  let modules = "";
  graph.forEach(mod => {
    modules += `${mod.id} :[
      function( require, module, exports){
        ${mod.code}
      },
      ${JSON.stringify(mod.mapping)}
    ],
    `;
  });
  const result = `
    (function(modules){
      function require(id){
        const [ fn, mapping] = modules[id];

        function localRequire(relativePath){
          return require(mapping[relativePath]);
        }
        const module = { exports : {}};
        fn(localRequire, module, module.exports);
        return module.exports;
      }
      require(0);
    })({${modules}})
  `;
  return result;
}
const graph = createGraph("./src/index.js");
const result = bundle(graph);

fs.writeFileSync("./bundle.min.js", result);
// console.log(result);
