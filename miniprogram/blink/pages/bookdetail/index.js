import { BookModel } from '../../models/book'
const bookModel = new BookModel()
// pages/bookdetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: {},
    comments: null,
    likeStatus: false,
    likeCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 页面接收的参数
  onLoad: function (options) {
    const { bookid } = options
    console.log(bookid);
    const detail = bookModel.getDetail(bookid)
    const comments = bookModel.getComments(bookid)
    const likeStatus = bookModel.getLikeStatus(bookid)
    detail.then((book) => {
      console.log('book', book);
      this.setData({ book })
    })
    comments.then(({ comments }) => {
      console.log('comments', comments);
      this.setData({ comments })
    })
    likeStatus.then((res) => {
      console.log(res);
      this.setData({
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      })
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
