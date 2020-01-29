"use strict";

const Controller = require("egg").Controller;

class NewsController extends Controller {
  async index() {
    console.log(this.ctx.cookies.get("name", { encrypt: true }));
    console.log("this.ctx.session.username", this.ctx.session.username);
    // this.ctx.body = "新闻页面";
    let msg = "后台新闻消息";
    // 渲染文件  会自动找文件
    // 这个render是个异步方法
    const list = await this.service.news.getNewsList();
    await this.ctx.render("news", { msg, list });
  }
  async content() {
    // query传值
    const { query } = this.ctx;
    this.ctx.body = "新闻详情";
  }
  async newsList() {
    // 动态路由传值
    const { params } = this.ctx;
    this.ctx.body = "新闻列表";
  }
}

module.exports = NewsController;
