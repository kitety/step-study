// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    like: false,
    count1: 12,
    count2: 123,
    yesSrc: "./images/like.png",
    noSrc: "./images/like@dis.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: e => {
      console.log(this);
    }
  }
});
