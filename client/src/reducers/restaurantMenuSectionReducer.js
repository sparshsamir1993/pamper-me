import {
  MENU_SECTION_LIST,
  NEW_MENU_SECTION_SAVED,
  MENU_SECTION_DELETE,
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
    default:
      return state;
  }
}
