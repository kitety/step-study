// 退订
function subscribe(listener) {
  listeners.push(listener)
  return function unsubscribe() {
    const index = listeners.indexOf(listener)
    listeners.splice(index, 1)
  }
}
// 使用
const unsubscribe = store.subscribe(() => {
  let state = store.getState();
  console.log(state.counter.count);
});
/*退订*/
unsubscribe();
