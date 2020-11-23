import React from "react";
import ReactDom from "react-dom";

/**
 * useEffect
 */

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

/**
 *
 * @param {*} callback 函数
 * @param {*} dependencies 依赖项
 */
function useCallback(callback, dependencies) {
  if (hookState[hookIndex]) {
    //说明不是第一次
    let [lastCallback, lastDependencies] = hookState[hookIndex];
    // 比较依赖 每一项都比较 新旧是不是一样的
    let same = dependencies.every(
      (item, index) => item === lastDependencies[index]
    );
    if (same) {
      // 一样的 不需要修改
      hookIndex++;
      return lastCallback;
    } else {
      // 不一样
      hookState[hookIndex++] = [callback, dependencies];
      return callback;
    }
  } else {
    // 第一次
    hookState[hookIndex++] = [callback, dependencies];
    return callback;
  }
}
/**
 *
 * @param {*} callback 对象
 * @param {*} dependencies 依赖项
 */
function useMemo(factory, dependencies) {
  // 每次都会执行 从0 开始 然后每次其实index都是一样 还是可以用currentIndex来存一遍

  if (hookState[hookIndex]) {
    //说明不是第一次
    let [lastMemo, lastDependencies] = hookState[hookIndex];
    // 比较依赖 每一项都比较 新旧是不是一样的
    let same = dependencies.every(
      (item, index) => item === lastDependencies[index]
    );
    if (same) {
      // 一样的 不需要修改
      hookIndex++;
      return lastMemo;
    } else {
      // 不一样
      let newMemo = factory();
      hookState[hookIndex++] = [newMemo, dependencies];
      return newMemo;
    }
  } else {
    // 第一次
    let memo = factory();
    hookState[hookIndex++] = [memo, dependencies];
    return memo;
  }
}

function useEffect(callback, dependencies) {
  if (hookState[hookIndex]) {
    let lastDependencies = hookState[hookIndex];
    // 比较依赖 每一项都比较 新旧是不是一样的
    let same = dependencies.every(
      (item, index) => item === lastDependencies[index]
    );
    if (same) {
      hookIndex++;
    } else {
      hookState[hookIndex++] = dependencies;
      callback();
    }
  } else {
    hookState[hookIndex++] = dependencies;
    callback();
  }
}
function Counter() {
  // 每次渲染你都执行 每次都要声明新对象
  const [number, setNumber] = useState(0);
  const [name, setName] = useState("hello");
  useEffect(() => {
    document.title = number;
    console.log(number);
  }, [number]);

  return (
    <div>
      <p>number:{number}</p>
      <p>name:{name}</p>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button
        onClick={() => {
          setNumber(1 + number);
        }}
      >
        +
      </button>
    </div>
  );
}
function render() {
  hookIndex = 0;
  ReactDom.render(<Counter />, document.getElementById("root"));
}
render();
