const Koa = require("koa");
const app = new Koa();
app.use(async (ctx) => {
  console.log(ctx.method); //获取请求方法
  console.log(ctx.url); //获取请求URL
  console.log(ctx.query); //获取解析的查询字符串对象
  console.log(ctx.querystring); //根据 ? 获取原始查询字符串.
  console.log(ctx.headers); //获取请求头对象
  ctx.body = ctx.url;
});
app.listen(3000, () => {
  console.log("server is starting at port 3000");
});
