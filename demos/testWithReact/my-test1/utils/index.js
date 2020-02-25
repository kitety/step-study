import checkPropTypes from "check-prop-types";
import { applyMiddleware, createStore } from "redux";
import RootReducer from "./src/reducer";
import { middleware } from "./src/createStore";

const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};
const checkProps = (component, expectProps) =>
  checkPropTypes(component.propTypes, expectProps, "props", component.name);

const testStore = initialState => {
  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
  return createStoreWithMiddleware(RootReducer, initialState);
};
export { findByTestAttr, checkProps, testStore };
