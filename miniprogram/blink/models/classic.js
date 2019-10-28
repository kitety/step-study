import { HTTP } from '../util/http.js'
class ClassicModel extends HTTP {
  getLatest (cb) {
    // 发送请求
    this.request({
      url: '/classic/latest',
      // 这里要用箭头函数绑定this
      success: res => {
        cb(res)
        this._setLatestIndex(res.index)
      }
    })
  }
  getClassic (index, nextOrPrevious, cb) {
    // 发送请求
    this.request({
      url: `/classic/${index}/${nextOrPrevious}`,
      // 这里要用箭头函数绑定this
      success: res => {
        cb(res)
      }
    })
  }
  isFirst (index) {
    return index === 1
  }
  isLatest (index) {
    return this._getLatestIndex() === index
  }
  _setLatestIndex (index) {
    wx.setStorageSync('latestIndex', index)
  }
  _getLatestIndex () {
    return wx.getStorageSync('latestIndex')
  }
}
export { ClassicModel }
