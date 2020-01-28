const Router = require("koa-router");
const router = new Router();
const bcrypt = require("bcryptjs");

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
 * @route GET /api/users/register
 * @desc 注册接口地址
 * @access 公开
 */
router.post("/register", async ctx => {
  const body = ctx.request.body;
  // 存储到数据库
  // 返回是个数组，如果长度为0，那么就是没查到
  const findResult = await User.find({ email: body.email });
  if (findResult.length > 0) {
    ctx.status = 500;
    ctx.body = { email: "邮箱已经被注册" };
  } else {
    const newUser = new User({
      name: body.name,
      email: body.email,
      password: body.password
    });
    // hash操作
    await bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          ctx.status = 500;
          ctx.body = { err };
        }
        newUser.password = hash;
      });
    });

    // // 存储
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

module.exports = router.routes();
