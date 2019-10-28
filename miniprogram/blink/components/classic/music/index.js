// components/classic/music/index.js
import { classic_beh } from '../classic-beh.js'
Component({
  /**
   * 组件的属性列表
   */
  // 继承的可以被子组件的覆盖,behaviors数组中的后面会覆盖前面的。但是生命周期函数不会覆盖，会一一执行
  behaviors: [classic_beh],
  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc:'images/player@pause.png',
    playSrc:'images/player@play.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
