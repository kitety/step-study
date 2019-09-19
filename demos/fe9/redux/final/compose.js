/**
 * applyMiddleware中，把[A,B,C]换位A(B(C(NEXT)))
 */
let chain=[A,B,C]
let dispatch=store.dispatch;
// [C,B,A]
chain.reverse().map(middleware=>{
  dispatch=middleware(dispatch)
}

// compose
const chain1 = [A, B, C];
dispatch = compose(...chain1)(store.dispatch)

// compose实现
export default function compose(...funcs) {
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
