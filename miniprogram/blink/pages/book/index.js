// pages/book/index.js
import { BookModel } from '../../models/book'
const bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 对象 保存状态
    // pending fulfilled rejected
    // const promise = new Promise((resolve, reject) => {
    //   wx.getSystemInfo({ success: res => resolve(res), fail: err => { reject(err) } })
    // })
    // promise.then(res => { console.log(res); }, err => { throw new TypeError(err) })

    // 多个api
    // const promise = bookModel.getHotList()
    // promise.then((result) => {
    //   console.log(result)
    //   bookModel.getMyBookCount().then((res) => {
    //     console.log(res)
    //   })
    // })

    // 新的promise调用
    // const promise = bookModel.getHotList()
    // promise.then((result) => {
    //   console.log(result)
    //   return bookModel.getMyBookCount()
    // }).then((res) => {
    //   console.log(res)
    // })
    const promise = bookModel.getHotList()
    promise.then((result) => {
      console.log(result)
      this.setData({ books: result })
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

  }
})
