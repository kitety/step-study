import {
  BookModel
} from '../../models/book'
import {
  LikeModel
} from '../../models/like.js'
const bookModel = new BookModel()
const likeModel = new LikeModel()
// pages/bookdetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: {},
    comments: [],
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 页面接收的参数
  onLoad: function (options) {
    wx.showLoading();
    const {
      bookid
    } = options
    const detail = bookModel.getDetail(bookid)
    const comments = bookModel.getComments(bookid)
    const likeStatus = bookModel.getLikeStatus(bookid)
    // 旧的promise写法
    // detail.then((book) => {
    //   this.setData({
    //     book
    //   })
    // })
    // comments.then(({
    //   comments
    // }) => {
    //   this.setData({
    //     comments
    //   })
    // })
    // likeStatus.then((res) => {
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCount: res.fav_nums
    //   })
    // })
    // 新的promise写法
    Promise.all([detail, comments, likeStatus]).then((result) => {
      const [book, { comments }, like] = result
      this.setData({
        book,
        comments,
        likeStatus: like.like_status,
        likeCount: like.fav_nums
      })
      wx.hideLoading()
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
  onLike (e) {
    let data = {
      behavior: e.detail.behavior,
      artId: this.data.book.id,
      category: 400
    }
    likeModel.like(data)
  },
  showFakePost () {
    this.setData({ posting: true })
  },
  hideFakePost () {
    this.setData({ posting: false })
  },
  onPost (e) {
    // 兼容写法
    const comment = e.detail.value || e.detail.text
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12字',
        icon: 'none'
      })
      return
    }
    bookModel.postComment(this.data.book.id, comment).then(() => {
      this.data.comments.unshift({
        content: comment,
        nums: 1
      })
      this.setData({
        posting: false,
        comments: this.data.comments
      })
      wx.showToast({
        title: '+1',
        icon: 'none'
      })
    })
  },
})
