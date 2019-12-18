import React, { useRef, useState } from "react";
import { Spin } from "antd";
import ReactDOM from "react-dom";
import { connect } from "dva";

function Loading(props) {
  const [inBox, setInBox] = useState(false);
  const $spinEle = useRef();
  const { debug = false, effects = "", loading } = props;
  function h(e) {
    // 开始采用的是便利模式
    // e.persist()
    // const domNode = ReactDOM.findDOMNode($spinEle.current)
    // setInBox(domNode.contains(e.target))
    setInBox(true);
  }
  if (debug) {
    const keysArr = Object.keys(props.loading.effects);
    for (let i = 0; i < keysArr.length; i++) {
      const element = keysArr[i];
      if (props.loading.effects[element]) {
        console.log(element);
      }
    }
  }

  let isLoading = false;
  if (Array.isArray(effects)) {
    for (let i = 0; i < effects.length; i++) {
      const element = effects[i];
      isLoading = isLoading || loading.effects[element];
    }
  } else {
    isLoading = loading.effects[effects];
  }
  if (!isLoading && inBox) {
    setInBox(false);
  }
  return (
    <Spin
      spinning={Boolean(isLoading && inBox)}
      onClickCapture={h}
      ref={$spinEle}
    >
      {props.children}
    </Spin>
  );
}
const mapStateToProps = ({ loading }) => {
  return { loading };
};
export default connect(mapStateToProps, {})(Loading);
