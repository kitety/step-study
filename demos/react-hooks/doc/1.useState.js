import React from "react";
import ReactDom from "react-dom";

let lastState; //上一个状态  组件渲染的时候保持上一个状态
function useState(initialState) {
  // 有值赋值  不然原始值
  lastState = lastState || initialState;

  function setState(newState) {
    lastState = newState;
    // 每次调用 重新刷新和渲染
    render();
  }
  return [lastState, setState];
}

function Counter() {
  const [number, setNumber] = useState(0);
  return (
    <div>
      <p>{number}</p>
      <div
        onClick={() => {
          setNumber(number + 1);
        }}
      >
        点击
      </div>

    </div>
  );
}
function render() {
  ReactDom.render(<Counter />, document.getElementById("root"));
}
render();
