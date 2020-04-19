import axios from "axios";

export const addItemToOrder = (values, history) => async (dispatch) => {
  const res = await axios.post("/api/order/addItem", values);
  console.log(res);
  let response = res.data;
  // console.log(response);
  if (typeof res.data === "string") {
    response = JSON.parse(res.data);
  } else if (typeof res.data === "object") {
    response = JSON.stringify(res.data);
  }

  if (res.data.order) {
    localStorage.setItem("orderSession", response);
  }
  debugger;
  dispatch({ type: "FETCH_ORDER", payload: res.data.order });
  console.log("dispatched");
};

export const removeItemFromOrder = (values, history) => async (dispatch) => {
  // debugger
  const res = await axios.post("/api/order/removeItem", values);
  // console.log(res);
  // console.log(response);
  let response = res.data;
  if (typeof res.data === "string") {
    response = JSON.parse(res.data);
  } else if (typeof res.data === "object") {
    response = JSON.stringify(res.data);
  }

  if (res.data.order) {
    localStorage.setItem("orderSession", response);
  }
  dispatch({ type: "FETCH_ORDER", payload: res.data.order });
  console.log("dispatched");
};

export const fetchCurrentOrder = (ID, history) => async (dispatch) => {
  const res = await axios.get("/api/order", {
    params: {
      ID,
    },
  });
  dispatch({ type: "FETCH_ORDER", payload: res.data });
};

export const createPayment = (values, history) => async (dispatch) => {
  console.log(values);
  const res = await axios.post("/api/payments", values);
};
