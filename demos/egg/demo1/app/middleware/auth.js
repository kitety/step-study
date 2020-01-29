"use strict";
/**
 * options 中间件配置
 * app appication实例
 * * 配置中间件
 */
module.exports = (options, app) => {
  // 返回一个异步方法
  return async function forbidIp(ctx, next) {
    ctx.state.csrf = ctx.csrf;
    await next();
  };
};
