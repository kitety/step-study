//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World1212',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userId: 123,
    show: !true,
    array: [{ msg: 'hello' }, { msg: 'world' }],
    newsData: null
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShow: function () {
    console.log('显示了', app);
    this.setData({
      motto: 111111111
    })
    app.globalData.age++
  },
  onHide: function () {
    // console.log('隐藏了')
  },
  tapMessage: function (e) {
    console.log('tapMessage', e)
  },
  handleTap3: function () {
    console.log('handleTap3');
  },
  handleTap2: function () {
    console.log('handleTap2');
  },
  handleTap1: function () {
    console.log('handleTap1');
  },
  loadData: function () {
    console.log('loadData');
    var that = this
    // 开发环境不校验请求域名以及 TLS 版本
    wx.request({
      url: 'https://jsonplaceholder.typicode.com/posts',
      success (res) {
        console.log(res.data)
        that.setData({
          newsData: res.data
        })
      }
    })
  }
})
