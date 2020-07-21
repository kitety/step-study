const Koa = require("koa");
const app = new Koa();

app.use(async (ctx, next) => {
  console.log('ctx: ', ctx);
  console.log(1);
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
  console.log(11);
});
// logger
app.use(async (ctx, next) => {
  console.log(2);

  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
  console.log(22);
});
// response
app.use(async (ctx) => {
  console.log(3);

  ctx.body = "Hello World";
  console.log(33);
});
app.on("error", (err) => {
  log.error("server error", err);
});
app.listen(3000, () => {
  console.log("服务启动在3000端口");
});
/**
 * 1
2
3
33
11
GET / - 3
22
 */