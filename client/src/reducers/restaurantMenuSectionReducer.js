export default function (state = [], action) {
  switch (action.type) {
    case "MENU_SECTION_LIST":
      return action.payload || false;
    default:
      return state;
  }
}
