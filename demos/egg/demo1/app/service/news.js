"use strict";

const Service = require("egg").Service;

class NewsService extends Service {
  async getNewsList() {
    // 获取新闻数据
    let list = ["1", "2", "3"];
    return list;
  }
}

module.exports = NewsService;
