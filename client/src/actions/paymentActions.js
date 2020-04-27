import axios from "axios";

export const createPayment = (values, history) => async (dispatch) => {
  const res = await axios.post("/api/payments", values);
  if (res.status === 200) {
    dispatch({ type: "FETCH_PAYMENT", payload: res.data.payment });
    const updatedOrder = {
      ...values.order,
      grand_total: res.data.payment.amount,
      is_confirmed: true,
      addressID: res.data.address.ID,
    };
    dispatch({ type: "FETCH_ORDER", payload: updatedOrder });
    history.push({
      pathname: "/trackOrder",
    });
  }
};

export const fetchOrderPayment = (orderID, history) => async (dispatch) => {};
