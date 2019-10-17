// 注意小程序会把绝对路径，当做相对路径解析
// import { HTTP } from '/util/http.js' // 报错
// import { HTTP } from '../../util/http.js'
import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'
let classicModel = new ClassicModel()
let likeModel = new LikeModel()
// pages/classic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 这里的this可以绑定到数据
    classicModel.getLatest(res => {
      console.log(res)
      // 数据更新 新增
      this.setData({ classic: res })
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
  likeClick (data) {
    console.log(data.detail.behavior)
    let behavior = data.detail.behavior
    likeModel.like({ category: this.data.classic.type, behavior, artId: this.data.classic.id })
  }
})
