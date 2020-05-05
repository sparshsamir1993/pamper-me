import { SET_SELECTED_MENU_SECTION } from "../actions/actionTypes";

export default function (state = {}, action) {
  switch (action.type) {
    case SET_SELECTED_MENU_SECTION:
      return action.payload || false;
    default:
      return state;
  }
}
