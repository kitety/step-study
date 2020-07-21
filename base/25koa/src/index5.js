const Koa = require("koa");
const querystring = require("querystring");
const path = require("path");
const convert = require("koa-convert");
const bodyParser = require("koa-better-body");
const app = new Koa();
app.use(
  convert(
    bodyParser({
      uploadDir: path.join(__dirname, "uploads"),
      keepExtensions: true,
    })
  )
);
app.use(async (ctx) => {
  if (ctx.method == "GET") {
    ctx.set("Content-Type", "text/html;charset=utf-8");
    ctx.body = `
 <form method="POST" enctype="multipart/form-data">
 <input name="username" >
 <input name="avatar" type="file" >
 <input type="submit">
 </form>
 `;
  } else if (ctx.method == "POST") {
    ctx.set("Content-Type", "application/json");
    console.log(ctx.request.fields);
    const { username, avatar } = ctx.request.fields;
    ctx.body = { username, img: avatar[0].path };
  } else {
    ctx.body = "Not Allowed";
  }
});
app.listen(3000, () => {
  console.log("server is starting at port 3000");
});
