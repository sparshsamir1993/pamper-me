import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import restaurantsReducer from "./restaurantReducer";
import selectedRestaurantReducer from "./selectedRestaurantReducer";
import restaurantItemsReducer from "./restaurantItemsReducer";
import orderItemsReducer from "./orderItemsReducer";
import orderReducer from "./orderReducer";
import addessesReducer from "./addressesReducer";

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  restaurants: restaurantsReducer,
  restaurantItems: restaurantItemsReducer,
  selectedRestaurant: selectedRestaurantReducer,
  order: orderReducer,
  orderItems: orderItemsReducer,
  addresses: addessesReducer
});
