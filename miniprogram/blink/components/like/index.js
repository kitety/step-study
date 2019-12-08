// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean,
      // value:false, // Boolean默认值就是false
      // observer(){}
    },
    count: {
      type: Number
    },
    readOnly: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: "./images/like.png",
    noSrc: "./images/like@dis.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike () {
      const { readOnly } = this.properties
      if (readOnly) {
        return
      }
      let like = this.data.like
      let count = this.data.count
      count = !like ? count + 1 : count - 1
      this.setData({
        count, like: !like
      })
      // 激活
      let behavior = this.data.like ? 'like' : 'cancel'
      // 事件触发
      this.triggerEvent('like', { behavior }, {})
    }
  }
});
