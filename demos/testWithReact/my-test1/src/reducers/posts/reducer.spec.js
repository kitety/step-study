import { types } from "../../actions/types";
import postsReducer from "./reducer";

describe("Posts Reducer", () => {
  it("should return default state", () => {
    const newState = postsReducer(undefined, {});
    expect(newState).toEqual([]);
  });
  it("should return a new state if receiving type", () => {
    const posts = [{ title: "1" }, { title: "2" }, { title: "3" }];
    const newState = postsReducer(undefined, {
      type: types.GET_POSTS,
      payload: posts
    });
    expect(newState).toEqual(posts);
  });
});
