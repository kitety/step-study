/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1580209612562_8914";

  // add your middleware config here
  config.middleware = ["logTime", "auth"];
  // config.middleware = ["logTime", "forbidIp"];
  // 配置公共api地址
  config.api = "http://www.phonegap100.com/";
  // 中间件参数
  config.logTime = {
    name: {
      cc: "hello"
    }
  };
  // 设置session
  config.session = {
    renew: true
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  // 配置模板引擎
  config.view = {
    mapping: {
      ".html": "ejs"
    }
  };

  return {
    ...config,
    ...userConfig
  };
};
