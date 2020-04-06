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

export const addUserAddress = (addressData, history) => async (dispatch) => {
  // debugger;
  const res = await axios.post("/api/user/addresses", addressData);
  console.log("result is", res);
  if (res.data.userUpdated) {
    dispatch({
      type: "FETCH_USER_AFTER_CURRENT_ADDRESS_UPDATE",
      payload: { addressID: res.data.ID },
    });
  }
  history.goBack();
};

export const editUserAddress = (addressData, history) => async (dispatch) => {
  console.log(addressData);
  // const res = await axios.post("/api/user/addresses", addressData);
  // console.log("result is", res);
  const res = await axios.put("/api/user/addresses", addressData);
  if (res.data[0] == 1) {
    dispatch({ type: "FETCH_EDITED_ADDRESSES", payload: addressData });
    history.goBack();
  }
};

export const deleteAddress = (addressID) => async (dispatch) => {
  console.log(addressID);
  const res = await axios.delete("api/user/addresses", {
    params: { addressID },
  });
  console.log(res);
  if (res.data) {
    dispatch({
      type: "FETCH_ADDRESSES_AFTER_DELETE",
      payload: { deleted: addressID },
    });
  }
};

export const updateUserCurrentAddress = (addressID, userID) => async (
  dispatch
) => {
  console.log(addressID, userID);
  const res = await axios.put("/api/user", { addressID, userID });
  console.log(res);
  if (res.data.length) {
    dispatch({
      type: "FETCH_USER_AFTER_CURRENT_ADDRESS_UPDATE",
      payload: { addressID },
    });
  }
};
