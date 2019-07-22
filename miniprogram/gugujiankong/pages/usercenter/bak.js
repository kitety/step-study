//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    email: '',
    password: ''
  },
  bindEmailInput: function (e) {
    this.setData({ email: e.detail.value })
  },
  bindPasswordInput: function (e) {
    this.setData({ password: e.detail.value })
  },
  login: function () {
    console.log(this.data)
    wx.showToast({
      title: '登录请求中',
      icon: 'loading',
      duration: 1000
    })
    // 2@qq.com 123123
    // 网络请求开始
    wx.request({
      url: 'https://api.gugujiankong.com/account/Login?email=' + this.data.email + '&password=' + this.data.password,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        wx.hideToast();
        console.log(JSON.parse(res.data))
        if (res.data.LoginStatus == 1) {
          // 进行一些用户状态储存
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 1000
          })
          wx.switchTab({
            url: 'pages/index/index',
            success: (result) => {
              console.log('跳转成功')
            },
            fail: () => {},
            complete: () => {}
          });
            
        } else {
          wx.showModal({
            title: '登陆失败',
            content: '请检查您填写的用户信息！',
            showCancel: false,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
              //  回调函数

            },
            fail: () => { },
            complete: () => { }
          });

        }
      }
    });
  }
})
