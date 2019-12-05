let nextUnitOfWork = null;
/**
 *
 * @param {*} deadline 可以获取当前空闲时间以及回调是否在超时时间前已经执行的状态，我们可以用它来检查在浏览器需要再次控制之前我们还有多少时间
 */
function workLoop(deadline) {
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
function performUnitOfWork(fiber) {
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
  let index = 0;
  let prevSibling = null;
  while (index < elements.length) {
    const element = elements[index];
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null
    };
    // 将其设置为子代还是同级，具体取决于它是否是第一个子代。
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
    index++;
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
function createDom(fiber) {
  // 对dom类型兼容
  const dom =
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);
  const isProperty = key => key !== "children";
  // 把props的属性放到dom上
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = fiber.props[name];
    });
  return dom;
}
function render(element, container) {
  // TODO next unit
  // 跟踪根fiber节点，work in progress root or wipRoot.
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    }
  };
  nextUnitOfWork = wipRoot;
}
// 没有下一个工作单元,就是完成了工作了，因此我们需要将fiber commit to dom
function commitRoot() {
  // TODO add nodes to dom
  commitWork(wipRoot.child);
  wipRoot = null;
}
// 节点递归到dom
function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  const domParent = fiber.parent.dom;
  domParent.appendChild(fiber.dom);
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

let nextUnitOfWork = null;
let wipRoot = null;
