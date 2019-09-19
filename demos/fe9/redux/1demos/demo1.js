// count的发布订阅
let state = {
  count: 1
}
let listeners = []
// 订阅
function subcribe(listener) {
  listeners.push(listener)
}
function changeCount(count) {
  state.count = count
  // 当count改变的时候，通知订阅
  for (let i = 0; i < listeners.length; i++) {
    const listener = listeners[i]
    listener()
  }
}

// 订阅
subcribe(() => {
  console.log('new value',state.count)
})
changeCount(2)
changeCount(3)
