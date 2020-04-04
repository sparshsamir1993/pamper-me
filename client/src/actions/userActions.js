import axios from "axios";
import { reducer } from "redux-form";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: "FETCH_USER", payload: res.data }); //for updating data. Dispatching new and updating it on the browser
};

export const fetchUserAddresses = (ID) => async (dispatch) => {
  console.log("ID", ID);
  const res = await axios.get("/api/user/addresses", {
    params: { userID: ID },
  });
  console.log("Addresses list are", res);
  dispatch({ type: "FETCH_ADDRESSES", payload: res.data });
};

export const addUserAddress = (addressData) => async (dispatch) => {
  const res = await axios.post("/api/user/addresses", addressData);
  console.log("result is", res);
};

export const editUserAddress = (addressData, history) => async (dispatch) => {
  console.log(addressData);
  // const res = await axios.post("/api/user/addresses", addressData);
  // console.log("result is", res);
  const res = await axios.put("/api/user/addresses", addressData);
  if (res.data[0] == 1) {
    dispatch({ type: "FETCH_ADDRESSES", payload: addressData });
    history.goBack();
  }
  // return;
  console.log("result is edited \n", res);
};
