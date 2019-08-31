export default {
  state: 'user',
  subscriptions: {
    setup ({ dispatch, history }) {
      dispatch({type:'hello'})
    },
  },
  reducers: {
  },
  effects: {
    *fetch ({ type, payload }, { put, call, select }) {
    },
  },
}
