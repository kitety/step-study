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
    if (typeof newState === "function") {
      // state的传递
      hookState[currentIndex] = newState(hookState[currentIndex]);
    } else {
      hookState[currentIndex] = newState;
    }
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
    let [oldDestory, lastDependencies] = hookState[hookIndex];
    // 比较依赖 每一项都比较 新旧是不是一样的
    let same = dependencies.every(
      (item, index) => item === lastDependencies[index]
    );
    if (same) {
      hookIndex++;
    } else {
      oldDestory();
      // 宏任务
      let destory = callback();
      hookState[hookIndex++] = [destory, dependencies];
      // 宏任务 本次渲染之后执行
    }
  } else {
    // 宏任务
    let destory = callback();
    hookState[hookIndex++] = [destory, dependencies];
  }
}
function useLayoutEffect(callback, dependencies) {
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
      // 微任务 浏览器渲染前之情
      queueMicrotask(callback);
      // callback();
    }
  } else {
    hookState[hookIndex++] = dependencies;
    // 微任务 浏览器渲染前之情
    queueMicrotask(callback);
    // callback();
  }
}
function useContext(context) {
  return context._currentValue;
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

function Animation() {
  let red = React.useRef();
  let green = React.useRef();
  // 宏任务结束后清空微任务 再去浏览器更新渲染
  useLayoutEffect(() => {
    // 微任务 先
    red.current.style.transform = "translate(500px)";
    red.current.style.transition = "all 500ms";
  });
  useEffect(() => {
    // 宏任务 后
    green.current.style.transform = "translate(500px)";
    green.current.style.transition = "all 500ms";
  });
  let style = { width: "100px", height: "100px" };
  return (
    <div>
      <div style={{ ...style, backgroundColor: "red" }} ref={red}></div>
      <div style={{ ...style, backgroundColor: "green" }} ref={green}></div>
    </div>
  );
}

// context 上下文
// 两个概念 提供者 消费者
let ReactContext = React.createContext();
console.log("ReactContext", ReactContext);
function Counter1() {
  // 返回这个对象{ state, setState }
  let { state, setState } = useContext(ReactContext);
  return (
    <div>
      <p>{state.number}</p>
      <button
        onClick={() => {
          setState({ number: state.number + 1 });
        }}
      >
        +
      </button>
    </div>
  );
}
function Counter2() {
  // 返回这个对象{ state, setState }
  return (
    <ReactContext.Consumer>
      {({ state, setState }) => (
        <div>
          <p>{state.number}</p>
          <button
            onClick={() => {
              setState({ number: state.number + 1 });
            }}
          >
            +
          </button>
        </div>
      )}
    </ReactContext.Consumer>
  );
}
function App() {
  const [state, setState] = React.useState({ number: 0 });
  return (
    <ReactContext.Provider value={{ state, setState }}>
      <Counter1 />
    </ReactContext.Provider>
  );
}

function UseEffectDestory() {
  const [number, setNumber] = useState(0);
  useEffect(() => {
    let timer = setInterval(() => {
      setNumber((a) => a + 1);
    }, 1000);
    return () => {
      console.log("clear ");
      clearInterval(timer);
    };
  }, [number]);
  return <div>{number}</div>;
}
function render() {
  hookIndex = 0;
  ReactDom.render(<UseEffectDestory />, document.getElementById("root"));
}
render();
