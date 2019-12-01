// components/search/index.js
import { KeyWordModel} from '../../models/keyword'
const keyWordModel = new KeyWordModel()
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancelSearch () {
      this.triggerEvent('onCancelSearch')
    },
    onConfirm (e) {
      keyWordModel.addToHistory(e.detail.value)
      console.log(keyWordModel.getHistory());
    }
  }
})
