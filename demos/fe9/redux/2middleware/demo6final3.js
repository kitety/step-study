import timeMiddleware from './timeMiddleware'
import loggerMiddleware from './loggerMiddleware'
import exceptionMiddleware from './exceptionMiddleware'
const createStore = function(reducer, initState) {
  let state = initState
  let listeners = []
  // 订阅
  function subscribe(listener) {
    listeners.push(listener)
  }
  function dispatch(action) {
    // 按照我的计划修改state
    state = reducer(state, action)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }
  }
  function getState() {
    return state
  }
  // 用一个不匹配任何计划的type来获得初始值
  dispatch({ type: Symbol() })
  return {
    subscribe,
    dispatch,
    getState
  }
}
// 返回一个函数，这个函数执行的话就会返回state
function combineReducers(reducers) {
  // reducerskeys=['counter','info']
  const reducerKeys = Object.keys(reducers)
  // 返回合并后的新的reducer函数
  return function combination(state = {}, action) {
    // 生成新的state
    const nextState = {}
    // 遍历执行所有的reducers，整合为一个新的state
    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i]
      const reducer = reducers[key]
      // 之前key的state
      const previousStateForKey = state[key]
      // 执行分reducer,获得新的state
      const nextStateForKey = reducer(previousStateForKey, action)
      nextState[key] = nextStateForKey
    }
    return nextState
  }
}

let infoInitState = {
  info: {
    name: '前端九部',
    description: '前端学习爱好者'
  }
}

let countInitState = {
  count: 0
}
// counter reducer
function counterReducer(state = countInitState, action) {
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
// info reducer
function infoReducer(state = infoInitState, action) {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...store,
        name: action.name
      }
    case 'SET_DESCRIPTION':
      return {
        ...store,
        description: action.description
      }
    default:
      return state
  }
}

const reducer = combineReducers({ counter: counterReducer, info: infoReducer })
// 想要的

/*接收旧的 createStore，返回新的 createStore*/
// const newCreateStore = applyMiddleware(exceptionMiddleware, timeMiddleware, loggerMiddleware)(createStore);
/*返回了一个 dispatch 被重写过的 store*/
// const store = newCreateStore(reducer);

// 真对createStore做一些整改
const applyMiddleware = function(...middlewares) {
  // 返回一个重写crateStore的方法
  return function rewriteCreateStoreFun(oldCreateStore) {
    // 返回重写后薪的createStore
    return function newCreateStore(reducer, initState) {
      // 生成store
      const store = oldCreateStore(reducer, initState)
      // 给每个middleware传下store，相当于const logger=loggerMiddleware(store)
      // const chain=[excption,time,logger]
      const chain = middlewares.map(middleware => middleware(store))
      let dispatch = store.dispatch
      // 实现exception(time(logger(dispatch)))
      // 一一修改，重复赋值
      chain.reverse().map(middleware => dispatch(middleware(dispatch)))
      // 重写dispatch
      store.dispatch = dispatch
      return store
    }
  }
}

// 让用户体验更好
// 没有中间件
const store1 = createStore(reducer, initState)

const rewriteCreateStoreFunc = applyMiddleware(
  exceptionMiddleware,
  timeMiddleware,
  loggerMiddleware
)
const newCreateStore = rewriteCreateStoreFunc(createStore)
const store2 = newCreateStore(reducer, initState)

// 统一
// 修改createStore的方法
const createStore = (reducer, initState, rewriteCreateStoreFunc) => {
  if (rewriteCreateStoreFunc) {
    const newCreateStore = rewriteCreateStoreFunc(createStore)
    return newCreateStore(reducer, initState)
  }
  // 旧的逻辑
  let state = initState
  let listeners = []
  // 订阅
  function subscribe(listener) {
    listeners.push(listener)
  }
  function dispatch(action) {
    // 按照我的计划修改state
    state = reducer(state, action)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }
  }
  function getState() {
    return state
  }
  // 用一个不匹配任何计划的type来获得初始值
  dispatch({ type: Symbol() })
  return {
    subscribe,
    dispatch,
    getState
  }
}

// 最终写法
const rewriteCreateStoreFunc = applyMiddleware(exceptionMiddleware, timeMiddleware, loggerMiddleware);
const store = createStore(reducer, initState, rewriteCreateStoreFunc);
