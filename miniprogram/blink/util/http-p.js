// import的时候要用相对路径，但是组件可以用绝对路径
import { config } from '../config.js'
const tips = {
  1000: '输入参数错误',
  1001: '输入的json格式不正确',
  1002: '找不到资源',
  1003: '未知错误',
  1004: '禁止访问',
  1005: '不正确的开发者key',
  1006: '服务器内部错误',
}
class HTTP {
  request ({ url, data, method = 'GET' }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }
  _request (url, resolve, reject, data = {}, method = 'GET') {
    wx.request({
      url: config.api_base_url + url,
      method: method || 'GET',
      data: data,
      header: {
        "content-Type": 'application/json',
        "appkey": config.appkey
      },
      success: res => {
        const code = res.statusCode.toString()
        if (code.startsWith('2') && resolve) {
          resolve(res.data)
        } else {
          reject()
          // 服务器异常
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: err => {
        reject(err)
        // 服务调用失败
        wx.showToast({
          title: '抱歉，出现了一个错误',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
  _show_error (error_code) {
    wx.showToast({
      title: tips[error_code] || '抱歉，出现了一个错误',
      icon: 'none',
      duration: 2000
    })
  }
}
export { HTTP }
