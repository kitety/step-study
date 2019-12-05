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
  console.log(element);
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
      dom[name] = element.props[name];
    });
  // 递归
  element.props.children.forEach(child => {
    render(child, dom);
  });
  container.appendChild(dom);
}
const Didact = {
  createElement,
  render
};
/** @jsx Didact.createElement */
const element = (
  <div style="background: salmon">
    <h1>Hello World</h1>
    <h2 style="text-align:right">from Didact</h2>
    <img src="https://mirror-gold-cdn.xitu.io/168e08de0c8bce697d1?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"/>
  </div>
);
const container = document.getElementById("root");
Didact.render(element, container);
