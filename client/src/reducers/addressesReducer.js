export default function(state = [], action) {
  switch (action.type) {
    case "FETCH_ADDRESSES":
      return action.payload || false;
    default:
      return state;
  }
}
