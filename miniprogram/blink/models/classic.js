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
        wx.setStorageSync(this._getKey(res.index), res)
      }
    })
  }
  getClassic (index, nextOrPrevious, cb) {
    // 缓存中寻找，或者api 写入到缓存中
    // key 确定key
    let key = nextOrPrevious === 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      // 发送请求
      this.request({
        url: `/classic/${index}/${nextOrPrevious}`,
        // 这里要用箭头函数绑定this
        success: res => {
          cb(res)
          // 写入到缓存中
          wx.setStorageSync(this._getKey(res.index), res)
        }
      })
    } else {
      cb(classic)
    }
  }
  isFirst (index) {
    return index === 1
  }
  isLatest (index) {
    return this._getLatestIndex() === index
  }
  getMyFavor (success) {
    const params = {
      url: '/classic/favor',
      success
    }
    this.request(params)
  }
  _setLatestIndex (index) {
    wx.setStorageSync('latestIndex', index)
  }
  _getLatestIndex () {
    return wx.getStorageSync('latestIndex')
  }
  _getKey (index) {
    let key = 'classic-' + index;
    return key
  }
}
export { ClassicModel }
