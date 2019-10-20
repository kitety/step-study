// components/spsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      observer (newV, oldV, changedPath) {
        let val = newV < 10 ? '0' + newV : newV
        // 这里要被type转换一下
        // 不能在observer修改自身属性，会被递归
        this.setData({ _index: val })
      }
    }
  },
  // wxs
  // properties和data将会合并为一个对象，properties会覆盖data的
  /**
   * 组件的初始数据
   */
  data: {
    year: 0,
    month: '一月',
    _index: '',
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  attached () {
    // 不知道是否真的传入了index
    let date = new Date();
    let year = date.getFullYear()
    let month = this.data.months[date.getMonth()];
    this.setData({ year, month })
  },
})
