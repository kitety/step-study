import React, { Component } from "react";
import PropTypes from "prop-types";

class SharedButton extends Component {
  submitEvent = () => {
    const { emitEvent } = this.props;
    if (emitEvent) {
      emitEvent();
    }
  };
  render() {
    const { buttonText } = this.props;
    return (
      <button data-test="buttonComponent" onClick={this.submitEvent}>
        {buttonText}
      </button>
    );
  }
}
SharedButton.propTypes = {
  buttonText: PropTypes.string,
  emitEvent: PropTypes.func
};
export default SharedButton;
