import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../../../utils";
import SharedButton from "./";

describe("SharedButton Component", () => {
  describe("Checking PropsTypes", () => {
    it("should not throw a warning", () => {
      const expectPropsTypes = {
        buttonText: "1",
        emitEvent: () => {}
      };
      const propsError = checkProps(SharedButton, expectPropsTypes);
      expect(propsError).toBeUndefined();
    });
  });
  describe("renders", () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        buttonText: "1",
        emitEvent: () => {}
      };
      wrapper = shallow(<SharedButton {...props} />);
    });
    it("should render a button ", () => {
      const button = findByTestAttr(wrapper, "buttonComponent");
      expect(button).not.toBeUndefined();

    });
  });
});
