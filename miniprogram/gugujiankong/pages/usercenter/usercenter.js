//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    openId: ''
  },
  onLoad: function () {
    const app = getApp();
    console.log(app);
    wx.getSetting({
      success (res) {
        console.log(res)
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
      }
    })

  }
})
