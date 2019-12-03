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

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false
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
    onConfirm (e) {
      wx.showLoading();
      this.setData({ searching: true })
      const q = e.detail.value || e.detail.text
      bookModel.search(q).then((result) => {
        console.log(result);
        const { books } = result
        keyWordModel.addToHistory(q)
        this.setData({ books })
        wx.hideLoading()
      })
    }
  }
})
