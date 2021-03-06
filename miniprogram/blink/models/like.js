import { HTTP } from '../util/http.js'
class LikeModel extends HTTP {
  like ({ behavior, artId, category, cb }) {
    let url = behavior === 'like' ? 'like' : 'like/cancel'
    this.request({
      url,
      method: 'POST',
      data: {
        art_id: artId,
        type: category
      },
      // 这里要用箭头函数绑定this
      success: res => {
        cb && cb(res)
      }
    })
  }
  getClassicLikeStatus (artId, category, cb ) {
    this.request({
      url: `classic/${category}/${artId}/favor`,
      // 这里要用箭头函数绑定this
      success: res => {
        cb && cb(res)
      }
    })
  }
}
export { LikeModel }
