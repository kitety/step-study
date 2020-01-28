const koa = require("koa");
const mongoose = require("mongoose");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");

// config
const db = require("./config/keys");
// 引入users.js
const users = require("./routes/api/users");

// 实例化对象
const app = new koa();
const router = new Router();
// 使用中间件
app.use(bodyParser());
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

// 路由
// router.get("/", async ctx => {
//   ctx.body = { msg: "ok" };
// });
router.use("/api/users", users);

// 配置路由
app.use(router.routes()).use(router.allowedMethods);
// 端口号
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is started on port: ${port}`);
});
