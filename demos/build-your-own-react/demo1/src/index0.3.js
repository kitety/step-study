import Didact from './old/render'
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
function App (props) {
  return <h1>Hi {props.name}</h1>
}
const element = <App name="f2121212oo" style={{color:'red'}}/>
const container = document.getElementById("root")
Didact.render(element, container)
