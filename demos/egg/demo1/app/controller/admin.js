"use strict";

const Controller = require("egg").Controller;

class AdminController extends Controller {
  async index() {
    // koa ctx.body=xxxx
    this.ctx.body = { aaa: "admin 路由" };
  }
}

module.exports = AdminController;
