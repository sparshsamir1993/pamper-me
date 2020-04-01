import axios from "axios";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: "FETCH_USER", payload: res.data }); //for updating data. Dispatching new and updating it on the browser
};

export const fetchUserAddresses = () => async dispatch => {
  const res = await axios.get("/api/user/addresses");
  dispatch({ type: "FETCH_ADDRESSES", payload: res.data });
};

export const addUserAddress = addressData => async dispatch => {
  const res = await axios.post("/api/user/addresses", addressData);
  console.log("result is", res);
};
