```js


function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children,
    },
  }
}


For example, createElement("div") returns:

{
  "type": "div",
  "props": { "children": [] }
}
createElement("div", null, a) returns:

{
  "type": "div",
  "props": { "children": [a] }
}
and createElement("div", null, a, b) returns:

{
  "type": "div",
  "props": { "children": [a, b] }
}
```
