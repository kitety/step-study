// 打印时间戳
const timeMiddleware = store => next => action => {
  console.log('time', new Date().getTime())
  next(action)
}
export default timeMiddleware
