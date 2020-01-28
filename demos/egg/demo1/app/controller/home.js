"use strict";

const Controller = require("egg").Controller;


class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // this.ctx.render()
    ctx.body = "你好";
  }
  async news() {
    const { ctx } = this;
    ctx.body = "你好news";
  }
}

module.exports = HomeController;
