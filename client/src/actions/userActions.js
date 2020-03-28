import axios from "axios";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: "FETCH_USER", payload: res.data }); //for updating data. Dispatching new and updating it on the browser
};

export const fetchUserAddresses = () => async dispatch => {
  const res = await axios.get("/api/user/addresses");
  dispatch({ type: "FETCH_ADDRESSES", payload: res.data });
};
