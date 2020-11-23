import React from "react";
import ReactDom from "react-dom";

// useMome UseCallback 减少组件渲染的次数 优化
// React.memo属性变了才重新渲染 不变就不渲染 比较的是引用地址 浅比较

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
  console.log(" callbac  khookIndex", hookIndex);
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
  console.log(" factory  khookIndex", hookIndex);
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

function memo(OldFunctionComponent) {
  return class extends React.PureComponent {
    render() {
      return <OldFunctionComponent {...this.props} />;
    }
  };
}
let Child = memo(({ data, addClick, data1 }) => {
  console.log("Child render");
  return <button onClick={addClick}>{data.number}</button>;
});
// 引用地址是一样的 没变
let myData;
let App = () => {
  // 每次渲染你都执行 每次都要声明新对象
  const [number, setNumber] = useState(0);
  const [name, setName] = useState("hello");
  const data = useMemo(() => {
    // 工厂
    return { number };
    // 依赖的变量
  }, [number]);
  const data1 = useMemo(() => {
    // 工厂
    return { number };
    // 依赖的变量
  }, [number]);
  // 每次声明新的函数  依赖项发生改变才会重新执行得到函数  否则是种用上次的缓存函数
  const addClick = useCallback(() => {
    setNumber(number + 1);
  }, [number]);
  console.log("hookState", hookState);
  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <Child data={data} addClick={addClick} data1={data1} />
    </div>
  );
};
function render() {
  hookIndex = 0;
  ReactDom.render(<App />, document.getElementById("root"));
}
render();
