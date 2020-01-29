const sd = require("silly-datetime");
// app/extend/helper.js
module.exports = {
  formatTime(param) {
    //格式化日期
    return sd.format(new Date(param*1000), "YYYY年MM月DD日 HH:mm");
  }
};
