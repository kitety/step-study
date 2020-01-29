"use strict";
/**
 * options 中间件配置
 * app appication实例
 * * 配置中间件
 */
module.exports = (options, app) => {
  console.log(options);
  // 返回一个异步方法
  return async function logTime(ctx, next) {
    console.log(1111111111, new Date());
    await next();
  };
};
