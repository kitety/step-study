const Koa = require("koa");
const app = new Koa();

app.use(async (ctx, next) => {
  console.log(ctx.url);
  if (ctx.url == "/write") {
    ctx.cookies.set("name", "zfpx");
    ctx.body = "write";
  } else {
    next();
  }
});
app.use(async (ctx) => {
  if (ctx.url == "/read") {
    ctx.body = ctx.cookies.get("name");
  }
});

app.on("error", (err) => {
  log.error("server error", err);
});
app.listen(3000, () => {
  console.log("服务启动在3000端口");
});
