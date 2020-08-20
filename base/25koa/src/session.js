const Koa = require("koa");
const session = require("koa-session");
const app = new Koa();
app.keys = ["zfpx"];
app.use(session({}, app));
app.use(async (ctx) => {
  let visit = ctx.session.visit;
  if (visit) {
    visit = visit + 1;
  } else {
    visit = 1;
  }
  ctx.session.visit = visit;
  ctx.body = `这是你的第${visit}次访问`;
});
app.listen(3000);
