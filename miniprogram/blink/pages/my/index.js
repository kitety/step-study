// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    userGlobalInfo: null,
    authorized: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 弹窗
    this.userAuthorized()

  },
  userAuthorized () {
    wx.getSetting({
      success: (data) => {
        if (data.authSetting['scope.userInfo']) {
          // 用户授权了调用这个函数才有信息
          wx.getUserInfo({
            success: (result) => {
              console.log(result);
              this.setData({
                userInfo: result.userInfo,
                userGlobalInfo: result,
                authorized: true
              })
            },
            fail: () => {
              console.log('没授权');
            },
            complete: () => { }
          });
        } else {
          console.log('未授权');

        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onGetUserInfo (e) {
    console.log(e);
    this.setData({
      userGlobalInfo: e.detail,
      userInfo: e.detail.userInfo,
      authorized: true
    })
  }
})
