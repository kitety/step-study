//logs.js
const util = require('../../utils/util.js')
const logger = require('../../utils/logger.js')

Page({
  data: {
    logs: [],
    item: {
      index: 0,
      msg: 'this is a template',
      time: '2016-09-15'
    }
  },
  onLoad: function() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  onReady: function() {
    console.log("onready")
  },
  onShow: function() {
    console.log("onShow")
    logger.printLog(77777)
  },
  onHide: function() {
    console.log("onHide")
  },
  onUnload: function() {
    console.log("onUnload")
  },
  onPullDownRefresh: function() {
    console.log("onPullDownRefresh")
  },
  onReachBottom: function() {
    console.log("onReachBottom")
  },
  onShareAppMessage: function() {
    console.log("onShareAppMessage")
  },
  onPageScroll: function() {
    console.log("onPageScroll")
  },
  onResize: function() {
    console.log("onResize")
  },
  onTabItemTap: function() {
    console.log("onTabItemTap")
  }
})
