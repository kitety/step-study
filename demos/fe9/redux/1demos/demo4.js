
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
function combineRudecer(reducers){
  // reducerskeys=[counter,info]
  const reducerKeys=Object.keys(reducers)
  // 返回合并后的新的reducer函数
  // 里面有对每个reducer的遍历判断执行的
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
      nextState[key]=nextStateForKey
    }
    return nextState
  }
}


let initState = {
  counter:{
    count: 0
  },
  info:{
    name:'前端九部',
    description:'前端学习爱好者'
  }
}

// counter reducer
function counterReducer(state, action) {
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
function inforReducer(state, action) {
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

const reducer=combineRudecer({counterReducer,inforReducer})

