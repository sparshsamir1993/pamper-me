import axios from "axios";

export const fetchUserRestaurants = () => async (dispatch) => {
  const res = await axios.get("/api/restaurants");
  console.log(res);

  dispatch({ type: "FETCH_RESTAURANTS", payload: res.data });
};

export const fetchRestaurants = () => async (dispatch) => {
  const res = await axios.get("/api/admin/restaurants");

  dispatch({ type: "FETCH_RESTAURANTS", payload: res.data });
};

export const getRestaurantItems = (values) => async (dispatch) => {
  // console.log(values);
  const res = await axios.get("/api/admin/restaurants/items", {
    params: {
      selectedRestaurant: values.selectedRestaurant,
    },
  });
  console.log(res);

  dispatch({ type: "FETCH_ITEMS", payload: res.data });
};

export const fetchUserRestaurantsItems = (values) => async (dispatch) => {
  console.log(values);
  const res = await axios.get("/api/admin/restaurants/items", {
    params: {
      selectedRestaurant: values.selectedRestaurant,
    },
  });
  console.log(res);

  dispatch({ type: "FETCH_ITEMS", payload: res.data });
};

export const createRestaurantMenuSection = (values) => async (dispatch) => {
  console.log(values);
  const res = await axios.post("/api/admin/restaurantMenuSection", values);
  console.log(res);
  dispatch({ type: "NEW_MENU_SECTION_SAVED" });
};

export const getRestaurantMenuSectionList = (values) => async (dispatch) => {
  console.log(values);
  const res = await axios.get("/api/restaurantMenuSection", {
    params: {
      restaurantID: values.ID,
    },
  });
  console.log(res);
  dispatch({ type: "MENU_SECTION_LIST", payload: res.data });
};
