// 0.1版本的
// 创建文本节点
function createTextElement (text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  };
}
function createElement (type, props, ...children) {
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


/**
 *
 * @param {*} deadline 可以获取当前空闲时间以及回调是否在超时时间前已经执行的状态，我们可以用它来检查在浏览器需要再次控制之前我们还有多少时间
 */
function workLoop (deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  requestIdleCallback(workLoop);
}
// https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback
// 在浏览器的空闲时段内调用的函数排队
// 理解：setTimeout，但是在主线程空闲时调用
requestIdleCallback(workLoop);

/**
 * 执行工作并且返回下一个工作单元
 * @param {*} fiber=nextUnitOfWork
 */
function performUnitOfWork (fiber) {
  // add dom node
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  /**
   * 每次处理元素时，我们都会在dom中添加一个新节点。 而且，请记住，在完成渲染整个树之前，浏览器可能会中断我们的工作。 在这种情况下，用户将看到不完整的UI。 而且我们不想要那样。要删除dom编译部分
   */
  // if (fiber.parent) {
  //   fiber.parent.dom.appendChild(fiber.dom);
  // }
  // create new fibers
  // Then for each child we create a new fiber.
  const elements = fiber.props.children;
  reconcileChildren(fiber, elements);
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
function reconcileChildren (wipFiber, elements) {
  let index = 0;
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
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
        effectTag: 'UPDATE' // 在commit阶段会使用到
      }
    }
    if (element && !sameType) {
      // add this type
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: 'PLACEMENT' // 在commit阶段会使用到
      }
    }
    if (oldFiber && !sameType) {
      // delete the oldFiber's node
      // 我们没有新的fiber，所以我们添加了effectTag到旧fiber。
      oldFiber.effectTag = 'DELETION'
      deleteions.push(oldFiber)
    }

    // newFiber = {
    //   type: element.type,
    //   props: element.props,
    //   parent: fiber,
    //   dom: null
    // };
    if (oldFiber) {
      oldFiber = oldFiber.sibling
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

// 以前的render
function createDom (fiber) {
  // 对dom类型兼容
  const dom =
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);
  // const isProperty = key => key !== "children";

  updateDom(dom, {}, fiber.props)
  // 把props的属性放到dom上
  // Object.keys(fiber.props)
  //   .filter(isProperty)
  //   .forEach(name => {
  //     dom[name] = fiber.props[name];
  //   });
  return dom;
}
function render (element, container) {
  // TODO next unit
  // 跟踪根fiber节点，work in progress root or wipRoot.
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    },
    //  old fiber的链接，旧fiber是我们在上一个提交阶段提交给dom的fiber。
    alternate: currentRoot
  };
  // 添加一个数组来记录需要删除的fiber
  deleteions = []
  nextUnitOfWork = wipRoot;
}
// 没有下一个工作单元,就是完成了工作了，因此我们需要将fiber commit to dom
function commitRoot () {
  // 对删除的fiber节点进行commit
  deleteions.forEach(commitWork)
  //  add nodes to dom
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}
// 节点递归到dom
function commitWork (fiber) {
  if (!fiber) {
    return;
  }
  const domParent = fiber.parent.dom;
  // 让我们更改commitWork函数来处理新的effectTags。
  if (fiber.effectTag === 'PLACEMENT' && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  }
  else if (fiber.effectTag === 'UPDATE' && fiber.dom != null) {
    // 更新已经存在的dom
    updateDom(fiber.dom, fiber.alternate.props, fiber.props)
  } else if (fiber.effectTag === 'DELETION') {
    domParent.removeChild(fiber.dom)
  }
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}
// updateDom
/**
 * 比较新旧fiber上面的props，删除要去掉的props，并且设置新的或者改变的
 */

// 时间监听器，以“on”前缀开头
const isEvent = key => key.startsWith('on')
const isProperty = key => (key !== 'children') && (!isEvent(key))
const isNew = (prev, next) => key => prev[key] !== next[key]
const isGone = (prev, next) => key => !(key in next)
function updateDom (dom, prevProps, nextProps) {
  // TODO
  // 删除旧的事件
  Object.keys(prevProps).filter(isEvent).filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key)).forEach(name => {
    const eventType = name.toLowerCase().substring(2)
    dom.removeEventListener(eventType, prevProps[name])
  })
  // 添加/更新新事件
  Object.keys(nextProps).filter(isEvent).filter(isNew(prevProps, nextProps)).forEach(name => {
    const eventType = name.toLowerCase().substring(2)
    dom.addEventListener(eventType, nextProps[name])
  })
  // 删除旧的属性
  Object.keys(prevProps).filter(isProperty).filter(isGone(prevProps, nextProps)).forEach(name => dom[name] = '')
  // 设置新的或者改变了的
  Object.keys(nextProps).filter(isProperty).filter(isNew(prevProps, nextProps)).forEach(name => dom[name] = nextProps[name])

}

let nextUnitOfWork = null;
let wipRoot = null;
let deleteions = null;
// commit时的保存
let currentRoot = null;
// 更新和删除的完善

const Didact = {
  createElement,
  render,
}
/** @jsx Didact.createElement */
const container = document.getElementById("root")
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
rerender("World 2222222")
setInterval(() => {
  // console.log(1);
  // rerender("World"+new Date())
}, 1000);
