const Router = require("koa-router");
const router = new Router();
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const db = require("../../config/keys");
// 引入验证
const validateRegisterInput = require("../../validation/register");

// 引入User模板
const User = require("../../models/User");
/**
 * @route GET /api/users/test
 * @desc 测试接口地址
 * @access 公开
 */
router.get("/test", async ctx => {
  ctx.status = 200;
  ctx.body = { msg: "test is ok" };
});

/**
 * @route POST /api/users/register
 * @desc 注册接口地址
 * @access 公开
 */
router.post("/register", async ctx => {
  const body = ctx.request.body;
  const { errors, isValid } = validateRegisterInput(body);
  if (!isValid) {
    ctx.status = 400;
    ctx.body = {
      errors,
      msg: "验证失败"
    };
    return;
  }
  // 存储到数据库
  // 返回是个数组，如果长度为0，那么就是没查到
  const findResult = await User.find({
    email: body.email
  });
  if (findResult.length > 0) {
    ctx.status = 500;
    ctx.body = {
      email: "邮箱已经被注册"
    };
  } else {
    // 头像的设置
    const avatar = gravatar.url(body.email, {
      s: "200",
      r: "pg",
      d: "mm"
    });
    // hash操作
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(body.password, salt);
    const newUser = new User({
      avatar,
      name: body.name,
      email: body.email,
      password: hash
    });
    // 存储
    await newUser
      .save()
      .then(user => {
        ctx.body = user;
      })
      .catch(err => {
        console.log(err);
        ctx.body = err;
      });
  }
});

/**
 * @route POST /api/users/login
 * @desc 测试接口地址 返回的是一个token
 * @access 公开
 */
router.post("/login", async ctx => {
  // 查询当前登录的邮箱
  const body = ctx.request.body;
  const findResult = await User.find({ email: body.email });
  if (findResult.length === 0) {
    ctx.status = 404;
    ctx.body = { msg: "用户不存在" };
  } else {
    const user = findResult[0];
    // 查到了 验证密码
    const result = bcrypt.compareSync(body.password, user.password);
    if (result) {
      // 验证成功 返回token
      const { id, name, avatar } = user;
      const payload = { id, name, avatar };
      const token = jwt.sign(payload, db.secretOrKey, { expiresIn: 3600 });
      ctx.status = 200;
      ctx.body = { msg: "登陆成功", success: result, token: "Bearer " + token };
    } else {
      // 验证失败
      ctx.status = 404;
      ctx.body = { msg: "密码错误", success: result };
    }
  }
});

/**
 * @route get /api/users/current
 * @desc 用户信息接口地址 返回用户信息
 * @access 私有
 */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  async ctx => {
    const { name, id, email, avatar } = ctx.state.user;
    ctx.body = { success: true, body: { name, id, email, avatar } };
  }
);

module.exports = router.routes();
