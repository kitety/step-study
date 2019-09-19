// 注意action={type='',other:''},action必须有一个type属性
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...store,
        count: state.count + 1
      }
    case 'DECREMENT':
      return {
        ...store,
        count: state.count - 1
      }
    default:
      return state
  }
}
// 封装一下
const createStore = function(reducer, initState) {
  let state = initState
  let listeners = []
  // 订阅
  function subscribe(listener) {
    listeners.push(listener)
  }
  function dispatch(action) {
    // 按照我的计划修改state
    state=store.getState()
    state = reducer(state, action)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }
  }
  function getState() {
    return state
  }
  return {
    subscribe,
    dispatch,
    getState
  }
}
// 有计划的状态管理器
let initState = {
  count: 0
}
let store = createStore(reducer,initState)
store.subscribe(() => {
  let state = store.getState()
  console.log(state.count)
})
// 增加
store.dispatch({ type: 'INCREMENT' })
// 减少
store.dispatch({ type: 'DECREMENT'})
// 随便改
store.dispatch({ count: 'abc' })

// 制定修改计划
