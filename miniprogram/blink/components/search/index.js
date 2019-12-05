// components/search/index.js
import { KeyWordModel } from '../../models/keyword'
import { BookModel } from '../../models/book'
import { paginationBev } from '../behaviors/pagination'
const keyWordModel = new KeyWordModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,
    q: '',
    total: 0,
    loadingCenter: false,
    loading: false
  },
  attached () {
    const historyWords = keyWordModel.getHistory()
    keyWordModel.getHot().then(res => {
      this.setData({ hotWords: res.hot })
    })
    this.setData({ historyWords })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancelSearch () {
      this.triggerEvent('onCancelSearch')
      this.setData({ searching: false })
      // 数据清空
      this.init()
    },
    onDelete () {
      this.setData({ searching: false, q: '' })
      // 数据清空
      this.init()
    },
    onConfirm (e) {

      const q = e.detail.value || e.detail.text
      this.setData({ searching: true, q, loadingCenter: true })
      // 获取文本
      bookModel.search(q).then((result) => {
        const { books, total } = result
        this.setMoreData(books)
        this.setToTal(total)
        keyWordModel.addToHistory(q)
      }).finally(() => {
        this.setData({ loadingCenter: false })
      })
    },
    loadMore () {
      const { loading, q, } = this.data
      if (!this.hasMore() || q === '' || loading) {
        return
      }
      this.setData({ loading: true })
      bookModel.search(q, this.getCurrentStart()).then((result) => {
        const { books } = result
        keyWordModel.addToHistory(q)
        this.setMoreData(books)
        this.setData({ loading: false })
      }).finally(() => {
        // 避免死锁
        this.setData({ loading: false })
      })
    }
    // this.data.loading=false也可以，因为html里面没有用。可以不用setData
    // 滚动到最底部
    // scroll-view  page onReachBottom
  }
})
