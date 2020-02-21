import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../../../utils";
import ListItem from "./index";
describe("ListItem Componnent", () => {
  describe("Checking PropsTypes", () => {
    it("should not throw a warning", () => {
      const expectPropsTypes = {
        title: "1",
        desc: "2"
      };
      const propsError = checkProps(ListItem, expectPropsTypes);
      expect(propsError).toBeUndefined();
    });
  });

  describe("renders", () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        title: "1",
        desc: "2"
      };
      wrapper = shallow(<ListItem {...props} />);
    });
    it("should render without errors", () => {
      const component = findByTestAttr(wrapper, "listItemComponent");
      expect(component.length).toBe(1);
    });
    it("should render a title", () => {
      const title = findByTestAttr(wrapper, "ComponentTitle");
      expect(title.length).toBe(1);
    });
    it("should render a desc", () => {
      const desc = findByTestAttr(wrapper, "ComponentDesc");
      expect(desc.length).toBe(1);
    });
  });
  describe("should not render", () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        desc: "2"
      };
      wrapper = shallow(<ListItem {...props} />);
    });
    it("should not render a title", () => {
      const title = findByTestAttr(wrapper, "ComponentTitle");
      expect(title.length).toBe(0);
    });
  });
});
