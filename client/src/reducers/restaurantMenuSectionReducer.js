import {
  MENU_SECTION_LIST,
  NEW_MENU_SECTION_SAVED,
  MENU_SECTION_DELETE,
  GET_MENU_SECTION,
  FETCH_EDITED_MENU_SECTION,
} from "../actions/actionTypes";

export default function (state = [], action) {
  switch (action.type) {
    case MENU_SECTION_LIST:
      return action.payload || false;
    case NEW_MENU_SECTION_SAVED:
      state.push(action.payload);
      return state;
    case MENU_SECTION_DELETE:
      if (action.payload.deleted) {
        return state.filter((section) => section.ID !== action.payload.deleted);
      }
      return state;
    case GET_MENU_SECTION:
      console.log(action);
    case FETCH_EDITED_MENU_SECTION:
      state = state.filter((section) => section.ID !== action.payload.ID);
      state = [...state, action.payload];
      return state.sort(function (a, b) {
        return a.ID < b.ID ? -1 : 1;
      });

    default:
      return state;
  }
}
