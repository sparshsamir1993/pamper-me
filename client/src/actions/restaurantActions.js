import axios from "axios";
import {
  MENU_SECTION_LIST,
  MENU_SECTION_DELETE,
  SET_SELECTED_MENU_SECTION,
} from "./actionTypes";

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
  dispatch({ type: "NEW_MENU_SECTION_SAVED", payload: res.data });
};

export const getRestaurantMenuSectionList = (values) => async (dispatch) => {
  console.log(values);
  const res = await axios.get("/api/restaurantMenuSection", {
    params: {
      restaurantID: values.ID,
    },
  });
  console.log(res);
  dispatch({ type: MENU_SECTION_LIST, payload: res.data });
};

export const deleteMenuSection = (ID) => async (dispatch) => {
  console.log(ID);

  const res = await axios.delete("/api/admin/restaurantMenuSection", {
    params: {
      ID,
    },
  });
  dispatch({ type: MENU_SECTION_DELETE, payload: { deleted: ID } });
  console.log(res);
};

export const setSelectedSection = (section) => async (dispatch) => {
  dispatch({ type: SET_SELECTED_MENU_SECTION, payload: section });
};

export const updateRestaurantMenuSection = (section) => async (dispatch) => {
  console.log(section);
};
