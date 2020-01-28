const koa = require("koa");
const mongoose = require("mongoose");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const passport = require("koa-passport");
const passportFun = require("./config/passport");

// config
const db = require("./config/keys");
// 引入users.js
const users = require("./routes/api/users");

// 实例化对象
const app = new koa();
const router = new Router();
// 使用中间件
app.use(bodyParser());
app.use(passport.initialize());
app.use(passport.session());
// 连接数据库
mongoose
  .connect(db.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(result => {
    console.log("connect successed");
  })
  .catch(err => {
    console.log("connect failed");
  });

// 回调到config文件中 passport.js
// 路由
// router.get("/", async ctx => {
  //   ctx.body = { msg: "ok" };
  // });
  router.use("/api/users", users);
  passportFun(passport);

// 配置路由
app.use(router.routes()).use(router.allowedMethods);
// 端口号
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is started on port: ${port}`);
});
