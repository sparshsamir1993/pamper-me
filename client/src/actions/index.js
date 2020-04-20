export * from "./userActions";
export * from "./restaurantActions";
export * from "./adminActions";
export * from "./orderActions";
export * from "./paymentActions";

export const loadInitailItemFormValues = (item) => {
  return {
    type: "LOAD_ITEM_VALUES",
    payload: item,
  };
};
export const setRestaurant = (restaurant) => {
  return {
    type: "SELECTED_RESTAURANT",
    payload: restaurant,
  };
};
