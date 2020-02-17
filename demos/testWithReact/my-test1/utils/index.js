import checkPropTypes from "check-prop-types";

const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};
const checkProps = (component, expectProps) =>
  checkPropTypes(component.propTypes, expectProps, "props", component.name);

export { findByTestAttr, checkProps };
