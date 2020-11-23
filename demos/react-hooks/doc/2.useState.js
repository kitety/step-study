import React from "react";
import ReactDom from "react-dom";

let hookState = []; //保存所有状态
let hookIndex = 0; //索引

// 每次渲染都会调用的
function useState(initialState) {
  hookState[hookIndex] = hookState[hookIndex] || initialState;
  // currentIndex 函数里面 不会变
  let currentIndex = hookIndex;
  function setState(newState) {
    hookState[currentIndex] = newState;
    render();
  }
  return [hookState[hookIndex++], setState];
}

function Counter() {
  const [number, setNumber] = useState(0);
  const [number1, setNumber1] = useState(0);
  return (
    <div>
      <p>{number}</p>
      <button
        onClick={() => {
          setNumber(number + 1);
        }}
      >
        点击
      </button>
      <hr />
      <p>{number1}</p>
      <button
        onClick={() => {
          setNumber1(number1 + 1);
        }}
      >
        点击
      </button>
    </div>
  );
}
function render() {
  // 不然索引会不断地更新
  hookIndex = 0;
  ReactDom.render(<Counter />, document.getElementById("root"));
}
render();
