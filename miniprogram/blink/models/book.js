import { HTTP } from "../util/http-p.js";
const http = new HTTP()
class BookModel extends HTTP {
  getHotList () {
    return http.request({ url: '/book/hot_list' })
  }
  getMyBookCount(){
    return http.request({ url: '/book/favor/count'})
  }
}
export { BookModel }
