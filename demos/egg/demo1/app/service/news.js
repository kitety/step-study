"use strict";

const Service = require("egg").Service;

class NewsService extends Service {
  async getNewsList() {
    // 获取新闻数据
    const list = ["1", "2", "3"];
    return list;
  }
  async getSpiderList() {
    // 通过接口返回数据
    // curl获取远程数据
    const url = this.config.api + "appapi.php?a=getPortalList&catid=20&page=1";
    const response = await this.ctx.curl(url);
    // console.log(response);
    // response.data是个buffer
    // 要转换为json
    return JSON.parse(response.data);
  }
  async getNewsContent(aid) {
    // 通过接口返回数据
    // curl获取远程数据
    const url = this.config.api + "appapi.php?a=getPortalArticle&aid=" + aid;
    const response = await this.ctx.curl(url);
    // console.log(response);
    // response.data是个buffer
    // 要转换为json
    return JSON.parse(response.data);
  }
}

module.exports = NewsService;
