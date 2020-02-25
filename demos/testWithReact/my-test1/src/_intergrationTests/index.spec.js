import moxios from "moxios";
import { testStore } from "../../utils/index";
import { fetchProps } from "../actions";

describe("fetchProps action", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test("Store is updated correctly", () => {
    const expectState = [
      { id: 1, title: "1", body: "Text" },
      { id: 2, title: "2", body: "Text" },
      { id: 3, title: "3", body: "Text" },
      { id: 4, title: "4", body: "Text" }
    ];
    const store = testStore(expectState);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectState
      });
    });
    return store.dispatch(fetchProps()).then(() => {
      const newState = store.getState();
      expect(newState.posts).toBe(expectState);
    });
  });
});
