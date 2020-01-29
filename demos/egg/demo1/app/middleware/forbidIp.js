"use strict";
/**
 * options 中间件配置
 * app appication实例
 * * 配置中间件
 */
module.exports = (options, app) => {
  // 返回一个异步方法
  return async function forbidIp(ctx, next) {
    const firbidIps = ["127.0.0.1"];
    // 获取客户端的ip
    const { ip } = ctx.request;
    const isForbid = firbidIps.includes(ip);
    if (!isForbid) {
      await next();
    } else {
      ctx.status = 403;
      ctx.body = "222222";
    }
  };
};
