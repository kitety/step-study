// components/classic/music/index.js
import { classic_beh } from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager();
Component({
  /**
   * 组件的属性列表
   */
  // 继承的可以被子组件的覆盖,behaviors数组中的后面会覆盖前面的。但是生命周期函数不会覆盖，会一一执行
  behaviors: [classic_beh],
  properties: {
    src: String,
    title: String
  },
  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
    playing: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay () {
      const { playing } = this.data
      mMgr.title = this.properties.title
      if (playing) {
        mMgr.pause()
      } else {
        mMgr.src = this.properties.src
      }
      this.setData({ playing: !playing })
    }
  },
  // 组件卸载
  detached () {
    // mMgr.stop()
  },
  // 组件加载
  attached () {
    // mMgr.stop()
    if (mMgr.paused) {
      this.setData({ playing: false })
    } else if (mMgr.src === this.properties.src) {
      this.setData({ playing: true })
    }
  }
})
