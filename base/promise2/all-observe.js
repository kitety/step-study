// vue 数据变化 更新视图 监控数据的变化  数据变化 更新视图
//  观察者模式 穿插着存入到被观察者中  自动触发
// 被观察者
class Subject {
  constructor() {
    this.state = 'happy'
    this.arr = []

  }

  // 注册
  attach (o) {
    this.arr.push(o)

  }
  setState (newState) {
    this.state = newState
    this.arr.forEach(item => item.update(newState))

  }

}
// 观察者
class Observable {
  constructor(name) {
    this.name = name

  }

  update (d) {
    console.log(this.name, d);
  }

}

let s = new Subject('baby')
let o1 = new Observable('I')
let o2 = new Observable('U')
s.attach(o1)
s.attach(o2)
s.setState('sad')


// promise
