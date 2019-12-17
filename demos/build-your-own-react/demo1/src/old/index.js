// 下一个工作单元
let nextUnitOfWork = null;
// work in process 当前正在运行的
let wipRoot = null;
// 待删除的数组
let deleteArr = null;
// commit时的保存
// last fiber tree we commited to the dom
// 旧bifer的链接，上一阶段提交给dom的fiber
let prevCommitRoot = null;
// 更新和删除的完善

// 0.1版本的
// 创建文本节点
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  };
}
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === "object" ? child : createTextElement(child)
      )
    }
  };
}
function render(element, container) {
  // TODO next unit
  // 跟踪根fiber节点，work in progress root.
  wipRoot = {
    // 以便追踪
    dom: container,
    props: {
      children: [element]
    },
    //  old fiber的链接，旧fiber是我们在上一个提交阶段提交的fiber。
    alternate: prevCommitRoot
  };
  // 添加一个数组来记录需要删除的fiber
  deleteArr = [];
  // root biber tree
  // 设置工作单元 idle时调用
  nextUnitOfWork = wipRoot;
  console.log("render--nextUnitOfWork", nextUnitOfWork);
}

/**
 *
 * @param {*} deadline 可以获取当前空闲时间以及回调是否在超时时间前已经执行的状态，我们可以用它来检查在浏览器需要再次控制之前我们还有多少时间
 */
function workLoop(deadline) {
  // console.log(
  //   "requestIdleCallback--workLoop--workLoop",
  //   deadline,
  //   nextUnitOfWork
  // );
  // 应该避让
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    // console.log(nextUnitOfWork);
    // timeRemaining它用来表示当前闲置周期的预估剩余毫秒数
    // 如果idle period已经结束，则它的值是0
    shouldYield = deadline.timeRemaining() < 1;
  }
  if (!nextUnitOfWork && wipRoot) {
    // console.info("workLoop", wipRoot);
    commitRoot();
  }
  // console.log(nextUnitOfWork);
  requestIdleCallback(workLoop);
}
// https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback
// 在浏览器的空闲时段内调用的函数排队
// 理解：setTimeout，但是在主线程空闲时调用
requestIdleCallback(workLoop);

/**
 * 执行工作并且返回下一个工作单元
 * @param {*} fiber=nextUnitOfWork
 * add dom node
 * create new fiber
 * 返回下一个工作单元
 */
function performUnitOfWork(fiber) {
  /**
   * 每次处理元素时，我们都会在dom中添加一个新节点。 而且，请记住，在完成渲染整个树之前，浏览器可能会中断我们的工作。 在这种情况下，用户将看到不完整的UI。 而且我们不想要那样。要删除dom编译部分
   */
  // if (fiber.parent) {
  //   fiber.parent.dom.appendChild(fiber.dom);
  // }
  // create new fibers
  // Then for each child we create a new fiber.
  // 函数式组件的2点不同
  // 1.函数组建的fiber没有dom节点
  // 2.child由运行结果而来，而不是props
  // const elements = fiber.props.children;

  // 看fiber 类型是不是一个函数，再看更新方式
  // console.error("performUnitOfWork", fiber);
  // console.error("performUnitOfWork", fiber.type);
  const isFunctionComponent = fiber.type instanceof Function;
  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }
  // return next unit of work
  // child sibling uncle ..
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}
// 在调用函数是组件前先初始化全局变量，然后就能在useState里面使用
let wipFiber = null;
let hookIndex = null;
function updateFunctionComponent(fiber) {
  console.log("updateFunctionComponent");
  wipFiber = fiber;
  hookIndex = 0;
  // 以支持在同一组件中多次调用useState。 我们跟踪当前的钩子索引
  wipFiber.hooks = [];
  //  TODO
  // 函数式的话就先运行，这个时候回处理hooks
  const children = [fiber.type(fiber.props)];
  // console.info("updateFunctionComponent",children);
  reconcileChildren(fiber, children);
}
// 在组件中运行
function useState(initial) {
  console.log("wipFiber", wipFiber);
  // TODO
  const oldHook =
    wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternate.hooks[hookIndex];
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: []
  };
  // 下次渲染组件时，我们会从旧的挂钩队列中获取所有动作，然后将它们逐一应用于新的挂钩状态，因此当我们返回更新后的状态。
  const actions = oldHook ? oldHook.queue : [];
  actions.forEach(action => {
    hook.state = action(hook.state);
  });
  const setState = action => {
    // console.log("action", action);
    hook.queue.push(action);
    wipRoot = {
      dom: prevCommitRoot.dom,
      props: prevCommitRoot.props,
      alternate: prevCommitRoot
    };
    // 不然不会进入循环
    nextUnitOfWork = wipRoot;
    deleteArr = [];
  };
  console.log("hookIndex", hookIndex);
  wipFiber.hooks.push(hook);
  hookIndex++;
  // 返回状态和方法
  // return [hook, state]
  // console.log(nextUnitOfWork);
  return [hook.state, setState];
}
function updateHostComponent(fiber) {
  //  TODO
  // add dom node
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  reconcileChildren(fiber, fiber.props.children);
}
// 分离代码创建新的fiber
// 在这里，我们将旧fiber与新元素进行协调。
// 我们同时遍历旧fiber的子级（wipFiber.alternate）和要协调的元素数组。
function reconcileChildren(wipFiber, elements) {
  let index = 0;
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  // console.log(oldFiber);
  let prevSibling = null;
  while (index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber = null;
    // TODO compare oldFiber to element
    /**
     * 比较策略type
     * old fiber和新元素有一样的type，我们可以保持dom节点，仅仅更新props
     * 如果type不一样，那是一个新的元素，我们需要创建一个新的dom节点
     * 如果types不同，而且有一个old fiber,我们可以移除old fiber
     * 在这里react用了key，更好的协调
     */
    const sameType = oldFiber && element && element.type === oldFiber.type;
    if (sameType) {
      // update the node
      // 一样的type，我们创建一个新的fiber节点，以使dom节点与旧fiber保持一致，而props与元素保持一致
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE" // 在commit阶段会使用到
      };
    }
    if (element && !sameType) {
      // add this type
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT" // 在commit阶段会使用到
      };
    }
    if (oldFiber && !sameType) {
      // delete the oldFiber's node
      // 我们没有新的fiber，所以我们添加了effectTag到旧fiber。
      oldFiber.effectTag = "DELETION";
      deleteArr.push(oldFiber);
    }

    // newFiber = {
    //   type: element.type,
    //   props: element.props,
    //   parent: fiber,
    //   dom: null
    // };
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
    // 将其设置为子代还是同级，具体取决于它是否是第一个子代。
    if (index === 0) {
      wipFiber.child = newFiber;
    } else if (element) {
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
    index++;
  }
}
/**
 * Concurrent Mode
 * 开始渲染后，直到渲染完完整的元素树后，我们才会停止。 如果元素树很大，则可能会阻塞主线程太长时间。 而且，如果浏览器需要执行诸如处理用户输入或使动画保持平滑等高优先级的工作，则它必须等到渲染完成为止。
 * 因此，我们将工作分成几个小单元，在完成每个单元后，如果需要执行其他任何操作，我们将让浏览器中断渲染
 * 现在使用的是时间调度器，https://github.com/facebook/react/issues/11171#issuecomment-417349573
 *
 * 要组织工作单元，我们需要一个数据结构：a fiber tree.一个元素一个fiber，每个fiber是一个工作单元
 */
/**
 * 
 *  * Didact.render(
  <div>
    <h1>
      <p />
      <a />
    </h1>
    <h2 />
  </div>,
  container
  )
 * 这样的结构https://pomb.us/static/a88a3ec01855349c14302f6da28e2b0c/ac667/fiber1.png
 * 在render创建root fiebr，并且设置为nextUnitOfWork，其余的工作都在performUnitOfWork进行了
 * 我们将为每个fiber做三件事
 * 1.添加element到dom
 * 2.为element的子元素创建fiber
 * 3.选择下一个工作单元
 * https://pomb.us/static/c1105e4f7fc7292d91c78caee258d20d/ac667/fiber2.png
 * 该数据结构的目标之一是使查找下一个工作单元变得容易。 这就是为什么每个fiber节点都链接到其第一个子节点，下一个兄弟姐妹和父节点。
 * 一个fiber完成，如果他有child，那么就是他的下一个fiber；如果没有child，就看兄弟元素sibling 
 * 如果元素没有child或者sibling，就返回父元素的兄弟，直到返回到root
 * 返回root 这意味着我们已经完成了渲染的所有工作
 */



// 没有下一个工作单元,就是完成了工作了，因此我们需要将fiber commit to dom
function commitRoot() {
  // 对删除的fiber节点进行commit
  deleteArr.forEach(commitWork);
  //  add nodes to dom
  commitWork(wipRoot.child);
  prevCommitRoot = wipRoot;
  wipRoot = null;
  // console.log("commitRoot--", nextUnitOfWork, wipRoot);
}
// 节点递归到dom
function commitWork(fiber) {
  console.log(fiber);
  // console.log("commitWork--fiber", fiber);
  if (!fiber) {
    return;
  }
  // TODO 函数式的com需要改变2个地方 -1
  // 找到父元素
  let domParentFiber = fiber.parent;
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  const domParent = domParentFiber.dom;
  // const domParent = fiber.parent.dom;
  // 让我们更改commitWork函数来处理新的effectTags。
  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    // 更新已经存在的dom
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === "DELETION") {
    // TODO函数式的com需要改变2个地方 -2
    // domParent.removeChild(fiber.dom)
    commitDeletion(fiber, domParent);
  }
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}
function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    // 递归
    commitDeletion(fiber.child, domParent);
  }
}
// updateDom
/**
 * 比较新旧fiber上面的props，删除要去掉的props，并且设置新的或者改变的
 */

// 时间监听器，以“on”前缀开头
const isEvent = key => key.startsWith("on");
const isProperty = key => key !== "children" && !isEvent(key);
const isNew = (prev, next) => key => prev[key] !== next[key];
const isGone = (prev, next) => key => !(key in next);
function updateDom(dom, prevProps, nextProps) {
  // TODO
  // 删除旧的事件
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });
  // 添加/更新新事件
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
  // 删除旧的属性
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => (dom[name] = ""));
  // 设置新的或者改变了的
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => (dom[name] = nextProps[name]));
}

const Didact = {
  createElement,
  render,
  useState
};

// /** @jsx Didact.createElement */
// const container = document.getElementById("root");
// const updateValue = e => {
//   console.log(e.target.value);
//   rerender(e.target.value);
// };
// const rerender = value => {
//   const element = (
//     <div>
//       <input onInput={updateValue} value={value} />
//       <h2>Hello {value}</h2>
//     </div>
//   );
//   Didact.render(element, container);
// };

export default Didact;

// 函数式组件的亮点不同
// 1.函数组建的fiber没有dom节点
// 2.child由运营结果而来，而不是props
