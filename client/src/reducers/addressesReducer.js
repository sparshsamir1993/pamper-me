export default function (state = [], action) {
  // debugger;
  switch (action.type) {
    case "FETCH_ADDRESSES":
      // debugger;
      if (!action.payload.length) {
        state = state.filter((x) => x.ID !== action.payload.addressID);
        state = [...state, action.payload];
        return state || [];
      }
      return action.payload || [];
    default:
      return state;
  }
}
