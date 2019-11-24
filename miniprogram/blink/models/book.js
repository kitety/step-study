import { HTTP } from "../util/http-p.js";
const http = new HTTP()
class BookModel extends HTTP {
  getHotList () {
    return http.request({ url: '/book/hot_list' })
  }
  getMyBookCount () {
    return http.request({ url: '/book/favor/count' })
  }
  getDetail (bookid) {
    return http.request({ url: `/book/${bookid}/detail` })
  }
  getLikeStatus (bookid) {
    return http.request({ url: `/book/${bookid}/favor` })
  }
  getComments (bookid) {
    return http.request({ url: `/book/${bookid}/short_comment` })
  }
  postComment (bookid, content) {
    return http.request({
      url: `/book/add/short_comment`, method: 'POST', data: {
        book_id: bookid,
        content
      }
    })
  }
}
export { BookModel }
