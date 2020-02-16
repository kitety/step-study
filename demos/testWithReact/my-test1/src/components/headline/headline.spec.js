import React from "react";
import { shallow } from "enzyme";
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
});
