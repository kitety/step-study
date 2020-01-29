"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // 设置cookie
    ctx.cookies.set("name", "hello", {
      maxAge: 1000 * 3600 * 24,
      signed: true,
      encrypt: true,
      httpOnly: true
    });
    this.ctx.session.username = "张三";
    // 清除cookie，设置为null，或者过期时间为0
    // egg cookie无法设置中文,如果开启加密就可以设置
    // this.ctx.render()
    ctx.body = "你好";
  }
  async news() {
    const { ctx } = this;
    ctx.body = "你好news";
  }
  async add() {
    const { ctx } = this;
    console.log(ctx.request.body);
  }
  async form() {
    const { csrf } = this.ctx;
    console.log(csrf);
    // await this.ctx.render("form", { csrf });
    await this.ctx.render("form");
  }
}

module.exports = HomeController;
