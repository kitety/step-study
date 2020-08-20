// const Koa = require("./koa");

let http = require("http");
class Koa {
  constructor() {
    this.middleware = [];
  }
  use(fn) {
    this.middleware.push(fn);
  }
  listen(port) {
    let middleware = this.middleware;
    let server = http.createServer((req, res) => {
      let ctx = { req, res };
      function dispatch(idx) {
        middleware[idx] && middleware[idx](ctx, () => dispatch(idx + 1));
      }
      dispatch(0);
    });
    server.listen(port);
  }
}
module.exports = Koa;

const app = new Koa();
app.use(async (async, next) => {
  console.log(1);
  await next();
  console.log(2);
});
app.use(async (ctx, next) => {
  console.log(3);
  await next();
  console.log(4);
});
app.use(async (ctx, next) => {
  console.log(5);
});
app.listen(3000);
