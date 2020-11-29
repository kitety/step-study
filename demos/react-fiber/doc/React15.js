import React from 'react';
import ReactDOM from 'react-dom';

// 虚拟DOM：描述了真实的dom的js对象
let element = <div id="a1">
  <div id="b1">
    <div id="c1"></div>
    <div id="c2"></div>
  </div>
  <div id="b2"></div>
</div>
/**
 * 节点多  层级深 递归调用 不能暂停
 * js单线程 ui渲染和js执行互斥 ---卡顿 阻塞主进程
 */
function render (element, parentDom) {
  // 创建dom元素
  let dom = document.createElement(element.type) // div
  // 添加属性
  Object.keys(element.props).filter(key => key !== 'children').forEach(key => {
    dom[key] = element.props[key]
  })
  if (Array.isArray(element.props.children)) {
    // 把每个子虚拟DOM变为真实的虚拟DOM 插入父dom
    element.props.children.forEach(child => render(child, dom))
  }
  parentDom.appendChild(dom)

}
render(
  element,
  document.getElementById('root')
);

