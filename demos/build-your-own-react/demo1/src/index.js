import Didact, { useState } from './old/render'
// /** @jsx Didact.createElement */
// const container = document.getElementById("root")
const updateValue = e => {
  console.log(e.target.value);
  rerender(e.target.value)
}
const rerender = value => {
  const element = (<div>
    <input onInput={updateValue} value={value} />
    <h2>Hello {value}</h2>
  </div>)
  Didact.render(element, container)
}
// rerender("World 2222222")
// setInterval(() => {
//   rerender("World"+new Date())
// }, 1000);
// function Component



/** @jsx Didact.createElement */
function Counter () {
  const [state, setState] = Didact.useState(1)
  return (
    <h1 onClick={() => setState(c => Math.random())}>
      Count: {state}
    </h1>
  )
}
const element = <Counter />
const container = document.getElementById("root")
Didact.render(element, container)
