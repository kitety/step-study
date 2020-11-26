import element from "./element";
let container = document.getElementById("root");
const PLACEMENT = "PLACEMENT";
const UPDATE = "UPDATE";
const REMOVE = "REMOVE";

// 下一个工作单元
// 初始化
// fiber 也是一个js对象
// 应用的根
let workInProcessRoot = {
  stateNode: container, // 此fiber对应的DOM节点
  props: {
    children: [element],
  },
  // child 大儿子 return 父亲 sibling 兄弟
};
// 赋值给下一个工作单元
let nextUnitOfWork = workInProcessRoot;
function workLoop(deadLine) {
  // 有工作单元就执行
  while (nextUnitOfWork && deadLine.timeRemaining() > 0) {
    // 传入工作单元 但会下一个工作单元
    nextUnitOfWork = performUnitWork(nextUnitOfWork);
  }
  if (!nextUnitOfWork && workInProcessRoot) {
    commitRoot();
  }
  requestIdleCallback(workLoop);
}

function commitRoot() {
  console.log(workInProcessRoot);
  let currentFiber = workInProcessRoot.firstEffect; //c1
  while (currentFiber) {
    console.log("commitRoot", currentFiber.props.id);
    if (currentFiber.effectTag === PLACEMENT) {
      currentFiber.return.stateNode.appendChild(currentFiber.stateNode);
    }
    currentFiber = currentFiber.nextEffect;
  }
  workInProcessRoot = null;
}
/**
 * beginWork 1.创建真实DOM 通过虚拟DOM创建fiber树结构
 * @param {*} workInProgressFiber 当前工作的fiber
 */
function performUnitWork(workInProgressFiber) {
  // 1.创建真实DOM 并不挂载  2.创建fiber子树
  beginWork(workInProgressFiber);
  // 有儿子就返回儿子 深度优先
  if (workInProgressFiber.child) {
    return workInProgressFiber.child;
  }
  while (workInProgressFiber) {
    // 没有儿子 当前节点就结束了
    completeUnitOfWork(workInProgressFiber);
    // 兄弟就返回兄弟
    if (workInProgressFiber.sibling) {
      return workInProgressFiber.sibling;
    }
    // 指向父亲再循环
    workInProgressFiber = workInProgressFiber.return;
  }
}
/**
 *
 * 创建DOM节点
 */
function beginWork(workInProgressFiber) {
  console.log("开始", workInProgressFiber.props.id);
  if (!workInProgressFiber.stateNode) {
    // 创建一个真实dom元素
    workInProgressFiber.stateNode = document.createElement(
      workInProgressFiber.type
    );
    // 属性处理
    for (const key in workInProgressFiber.props) {
      if (
        Object.hasOwnProperty.call(workInProgressFiber.props, key) &&
        key !== "children"
      ) {
        const element = workInProgressFiber.props[key];
        workInProgressFiber.stateNode[key] = element;
      }
    }
  }
  /* 在beginwork里面是不会挂载的 */
  // 创建子fiber
  let previousFiber;
  // children 是一个虚拟DOM的数组
  workInProgressFiber.props.children &&
    workInProgressFiber.props.children.forEach((child, index) => {
      let childFiber = {
        type: child.type, //类型
        props: child.props, //属性
        return: workInProgressFiber, // 父亲
        effectTag: PLACEMENT, // 副作用标记 插入到父 DOM
        nextEffectTag: null, // 下一个有副作用的节点
      };
      // 赋值给儿子和silibing
      if (index === 0) {
        workInProgressFiber.child = childFiber;
      } else {
        previousFiber.sibling = childFiber;
      }
      // 缓存一下 用来放sibling
      previousFiber = childFiber;
    });
}
function completeUnitOfWork(workInProgressFiber) {
  console.log("完成", workInProgressFiber.props.id);
  // 构建副作用链 effectList 只有 有副作用的节点

  // 链表 完成的顺序
  // firstEffect 指向第一个有副作用的子节点
  // lastEffect 指向第最后一个有副作用的子节点

  let returnFiber = workInProgressFiber.return; // A1
  if (returnFiber) {
    // 把当前fiber的有副作用的子链表 挂载到父亲身上
    if (!returnFiber.firstEffect) {
      returnFiber.firstEffect = workInProgressFiber.firstEffect;
    }
    if (workInProgressFiber.lastEffect) {
      //C2
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = workInProgressFiber.firstEffect;
      }
      returnFiber.lastEffect = workInProgressFiber.lastEffect;
    }
    // 把自己挂到后面去
    if (workInProgressFiber.effectTag) {
      if (returnFiber.lastEffect) {
        //对象为空
        returnFiber.lastEffect.nextEffect = workInProgressFiber;
      } else {
        returnFiber.firstEffect = workInProgressFiber;
      }
      returnFiber.lastEffect = workInProgressFiber;
    }
  }
}
// 空闲的时候执行wotkloop
requestIdleCallback(workLoop);
