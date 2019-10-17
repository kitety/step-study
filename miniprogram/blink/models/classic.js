import { HTTP } from '../util/http.js'
class ClassicModel extends HTTP {
  getLatest (cb) {
    // 发送请求
    this.request({
      url: '/classic/latest',
      // 这里要用箭头函数绑定this
      success: res => {
        cb(res)
      }
    })
  }
}
export { ClassicModel }
