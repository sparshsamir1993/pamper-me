import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import restaurantsReducer from "./restaurantReducer";
import selectedRestaurantReducer from "./selectedRestaurantReducer";
import restaurantItemsReducer from "./restaurantItemsReducer";
import orderItemsReducer from "./orderItemsReducer";
import orderReducer from "./orderReducer";
import addessesReducer from "./addressesReducer";
import paymentReducer from "./paymentReducer";
import restaurantMenuSectionReducer from "./restaurantMenuSectionReducer";
import selectedSectionReducer from "./selectedSectionReducer";

export default combineReducers({
  auth: authReducer,
  form: reduxForm.plugin({
    adminRestaurantMenuSectionNew: (state, action) => {
      switch (action.type) {
        case "NEW_MENU_SECTION_SAVED":
          return undefined;
        default:
          return state;
      }
    },
  }),
  restaurants: restaurantsReducer,
  restaurantItems: restaurantItemsReducer,
  selectedRestaurant: selectedRestaurantReducer,
  order: orderReducer,
  orderItems: orderItemsReducer,
  addresses: addessesReducer,
  payment: paymentReducer,
  restaurantMenuSections: restaurantMenuSectionReducer,
  selectedSection: selectedSectionReducer,
});
