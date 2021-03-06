import { HTTP } from '../util/http-p';
class KeyWordModel extends HTTP {
  key = 'keyword'
  maxLength = 10
  getHistory () {
    return wx.getStorageSync(this.key) || [];
  }
  addToHistory (keyword) {
    const data = this.getHistory() || []
    data.unshift(keyword)
    const save = Array.from(new Set(data)).slice(0, this.maxLength)
    wx.setStorageSync(this.key, save);
  }
  getHot () {
    return this.request({ url: '/book/hot_keyword' })
  }
}
export { KeyWordModel }
