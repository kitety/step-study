import { observable, autorun, toJS, isObservableObject, action, computed, configure } from 'mobx'
// 强制action，不能直接修改
// 防止在很多store都写这个，所以在入口文件修改
// configure({ enforceActions: 'observed' })

class Bird {
  constructor() {
    this.birds = []
  }

  // 数组被观察了 object array map
  @observable birds

  @action addBird = (bird) => {
    this.birds.unshift(bird)
  }
  // 读 调用的时候省略括号的方法
  @computed get firstBird () {
    // 需要转换一下，不然会有bug
    // return toJS(this.birds)[0]
    return this.birds.slice()[0]
  }
  @computed get birdCount () {
    return toJS(this.birds).length
  }
  // firstBird = () => {
  //   return this.birds[0]
  // }
}
const store = new Bird()
// 导出实例
export default store



// 初始化执行+修改了observable就会执行
autorun(() => {
  // console.log(toJS(store.firstBird));
  // console.log(toJS(store.birds));
  // console.log('print')
})
