"use strict";

const Controller = require("egg").Controller;

class SpiderController extends Controller {
  async index() {
    const response = await this.service.news.getSpiderList();
    // console.log(response);
    // this.ctx.body = response;
    await this.ctx.render("news2", { list: response.result });
  }
  async content() {
    this.app.foo()
    const { aid } = this.ctx.query;
    const response = await this.service.news.getNewsContent(aid);
    // console.log(response);
    // this.ctx.body = response;
    await this.ctx.render("content2", { content: response.result[0] });
  }
}

module.exports = SpiderController;
