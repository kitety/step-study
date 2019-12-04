// components/search/index.js
import { KeyWordModel } from '../../models/keyword'
import { BookModel } from '../../models/book'
const keyWordModel = new KeyWordModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: '_loadMore'
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
    },
    onDelete () {
      this.setData({ searching: false, q: '' })
    },
    onConfirm (e) {
      // loading
      wx.showLoading();
      const q = e.detail.value || e.detail.text
      this.setData({ searching: true, q })
      // 获取文本
      bookModel.search(q).then((result) => {
        console.log(result);
        const { books, total } = result
        keyWordModel.addToHistory(q)
        this.setData({ books, total })
        wx.hideLoading()
      })
    },
    _loadMore () {
      const { loading, q, total, books: oldBooks } = this.data
      const len = oldBooks.length
      if (len >= total || q === '' || loading) {
        return
      }
      this.setData({ loading: true })
      wx.showLoading();
      bookModel.search(q, len).then((result) => {
        const { books } = result
        keyWordModel.addToHistory(q)
        this.setData({ books: [...oldBooks, ...books], loading: false })
        wx.hideLoading()
        // this.data.loading=false也可以，因为html里面没有用。可以不用setData
      })
    }
    // 滚动到最底部
    // scroll-view  page onReachBottom
  }
})
