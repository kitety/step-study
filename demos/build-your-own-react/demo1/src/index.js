import Didact from "./old/render";
// /** @jsx Didact.createElement */
// const container = document.getElementById("root")
const updateValue = e => {
  console.log(e.target.value);
  rerender(e.target.value);
};
const rerender = value => {
  const element = (
    <div>
      <input onInput={updateValue} value={value} />
      <h2>Hello {value}</h2>
    </div>
  );
  Didact.render(element, container);
};
// rerender("World 2222222")
// setInterval(() => {
//   rerender("World"+new Date())
// }, 1000);
// function Component

/** @jsx Didact.createElement */
function Counter() {
  const [state, setState] = Didact.useState(1);
  const [state2, setState2] = Didact.useState(1);
  return (
    <div>
      <h1 onClick={() => setState(() => Math.random())}>Count1: {state}</h1>
      <h1 onClick={() => setState2(() => Math.random())}>Count2 {state2}</h1>
      {state > 0.5 ? (
        <span>state is bigger then 0.5</span>
      ) : (
        <span>state is less than 0.5</span>
      )}
      <div>
        <p>
          <span>A Span</span>
        </p>
        <p>
          <span>B Span</span>
        </p>
      </div>
    </div>
  );
}
const element = (
  <div>
    <Counter />
  </div>
);
const container = document.getElementById("root");
Didact.render(element, container);
