import React from "react";
import { shallow } from "enzyme";
import checkPropTypes from "check-prop-types";
import Headline from "./";
import { findByTestAttr } from "../../../utils";

const setUp = (props = {}) => {
  const component = shallow(<Headline {...props} />);
  return component;
};
describe("Headline Component", () => {
  describe("Have Props", () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        header: "Test Header",
        desc: "Test Desc"
      };
      wrapper = setUp(props);
    });
    it("Should render without errors", () => {
      const component = findByTestAttr(wrapper, "HeadlineComponent");
      expect(component.length).toBe(1);
    });
    it("Should render a h1", () => {
      const h1 = findByTestAttr(wrapper, "headerWrapper");
      expect(h1.length).toBe(1);
    });
    it("Should render a description", () => {
      const p = findByTestAttr(wrapper, "descWrapper");
      expect(p.length).toBe(1);
    });
  });
  describe("Have NO Props", () => {
    let wrapper;
    beforeEach(() => {
      const props = {};
      wrapper = setUp(props);
    });
    it("Should not render", () => {
      const component = findByTestAttr(wrapper, "HeadlineComponent");
      expect(component.length).toBe(0);
    });
  });
  describe(" Checking PropTypes", () => {
    it("Should not throw a warning", () => {
      const expectProps = {
        header: "Test Header",
        desc: "Test Desc",
        tempArr: [{ fName: "L", lName: "B", age: 24, onlineStatus: false }]
      };
     const propsErr = checkPropTypes(Headline.propTypes, expectProps,'props',Headline.name);
     expect(propsErr).toBeUndefined()

    });
  });
});
