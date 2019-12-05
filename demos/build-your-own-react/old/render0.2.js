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
  requestIdleCallback(workLoop);
}
// https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback
// 在浏览器的空闲时段内调用的函数排队
// 理解：setTimeout，但是在主线程空闲时调用
requestIdleCallback(workLoop);

/**
 * 执行工作并且返回下一个工作单元
 * @param {*} nextUnitOfWork 
 */
function performUnitOfWork(nextUnitOfWork) {
  // TODO
}
/**
 * Concurrent Mode
 * 开始渲染后，直到渲染完完整的元素树后，我们才会停止。 如果元素树很大，则可能会阻塞主线程太长时间。 而且，如果浏览器需要执行诸如处理用户输入或使动画保持平滑等高优先级的工作，则它必须等到渲染完成为止。
 * 因此，我们将工作分成几个小单元，在完成每个单元后，如果需要执行其他任何操作，我们将让浏览器中断渲染
 * 现在使用的是时间调度器，https://github.com/facebook/react/issues/11171#issuecomment-417349573
 */

// 以前的render
function render(element, container) {
  // 对dom类型兼容
  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);
  const isProperty = key => key !== "children";
  // 把props的属性放到dom上
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props.name;
    });
  // 递归
  element.props.forEach(child => {
    render(child, dom);
  });
  container.appendChild(element);
}

