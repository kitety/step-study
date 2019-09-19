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
let store = createStore(reducer)

// 中间件是对 dispatch 的扩展，或者说重写，增强 dispatch 的功能！
const next = store.dispatch
// 重写store的dispatch
// store.dispatch=function(action){
//   console.log('this.state',store.getState().counter.count)
//   console.log('action',action)
//   next(action)
//   console.log('next.state',store.getState().counter.count)
// }

// // 记录异常
// store.dispatch = (action) => {
//   try {
//     next(action);
//   } catch (err) {
//     console.error('错误报告: ', err)
//   }
// }

// // 多个中间件的合作
// store.dispatch = (action) => {
//   try {
//     console.log('this state', store.getState());
//     console.log('action', action);
//     next(action);
//     console.log('next state', store.getState());
//   } catch (err) {
//     console.error('错误报告: ', err)
//   }
// }

//实现扩展性很强的多中间件合作模式
// /**loggerMiddleware */
// const loggerMiddlewar = action => {
//   console.log('this state', store.getState())
//   console.log('action', action)
//   next(action)
//   console.log('next state', store.getState())
// }

// store.dispatch = action => {
//   try {
//     loggerMiddlewar(action)
//   } catch (err) {
//     console.error('错误报告: ', err)
//   }
// }

/**exceptionMiddleware */
const exceptionMiddleware1 = action => {
  try {
    // next(action)
    loggerMiddlewar(action)
  } catch (err) {
    console.error('错误报告: ', err)
  }
}
// store.dispatch = exceptionMiddleware

// 整改 抽出
const exceptionMiddleware = next => action => {
  try {
    next(action)
    // loggerMiddlewar(action)
  } catch (err) {
    console.error('错误报告: ', err)
  }
}
// store.dispatch = exceptionMiddleware(loggerMiddlewar)
// store.dispatch({type:'INCREMENT'})

// 修改loggerMiddlewar
/**loggerMiddleware */
const loggerMiddlewar = next => action => {
  console.log('this state', store.getState())
  console.log('action', action)
  next(action)
  console.log('next state', store.getState())
}


