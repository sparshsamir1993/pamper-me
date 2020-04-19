export default function (state = {}, action) {
  switch (action.type) {
    case "FETCH_PAYMENT":
      return action.payload || false;
    default:
      return state;
  }
}
