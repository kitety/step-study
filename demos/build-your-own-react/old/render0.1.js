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
