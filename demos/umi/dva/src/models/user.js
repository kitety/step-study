import produce from 'immer'
export default {
  state: {
    count: 0
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      dispatch({ type: 'add' })
    },
  },
  reducers: {
    add (state, action) {
      // dva-immer的效果
      // state.count += 1
      // return {
      //   count: state.count + 1
      // }
      // 直接使用immer
      return produce(state,nState=>{
        nState.count+=1
      })
    }
  },
  effects: {
    *fetch ({ type, payload }, { put, call, select }) {
    },
  },
}
