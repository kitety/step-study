"use strict";

/**
 * mvc
 * view 视图 模板 页面的展示
 * controller 负责处理一些业务逻辑
 * model 和数据打交道（查询数据库，请求数据）
 * middleware中间件
 */
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get("/", controller.home.index);
  router.get("/news", controller.news.index);
  router.get("/newscontent", controller.news.content);
  router.get("/newsList/:id", controller.news.newsList);
  router.get("/admin", controller.admin.index);
};
