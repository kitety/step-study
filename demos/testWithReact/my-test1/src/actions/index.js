import { types } from "./types";
import axios from "axios";

export const fetchProps = () => async dispatch => {
  const res = await axios.get(
    "https://jsonplaceholder.typicode.com/posts?_limit=10"
  );
  console.log(res);
  dispatch({ type: types.GET_POSTS, payload: res.data });
};
