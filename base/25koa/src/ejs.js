const Koa = require("koa");
const views = require("koa-views");
const path = require("path");
const app = new Koa();
app.use(
  views(path.join(__dirname, "./views"), {
    extension: "ejs",
  })
);
app.use(async (ctx) => {
  await ctx.render("index", { name: "维基百科" });
});
app.listen(3000, () => {
  console.log("server is starting at port 3000");
});
