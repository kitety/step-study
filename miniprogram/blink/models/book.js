import { HTTP } from "../util/http-p.js";
const http = new HTTP()
class BookModel extends HTTP {
  geHotList () {
    return http.request('/book/hot_list')
  }
}
export { BookModel }
