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

const store = createStore(reducer)
const next = store.dispatch

const loggerMiddleware = next => action => {
  console.log('this state', store.getState())
  console.log('action', action)
  next(action)
  console.log('next state', store.getState())
}

const exceptionMiddleware = next => action => {
  try {
    next(action)
  } catch (err) {
    console.error('错误报告: ', err)
  }
}

store.dispatch = exceptionMiddleware(loggerMiddleware(next))
