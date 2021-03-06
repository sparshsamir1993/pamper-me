export default function (state = [], action) {
  switch (action.type) {
    case "FETCH_ADDRESSES":
      // debugger;
      return action.payload || [];
    case "FETCH_EDITED_ADDRESSES":
      if (!action.payload.length) {
        state = state.filter((x) => x.ID !== action.payload.addressID);
        state = [...state, action.payload];
        return state || [];
      }
      return state;
    case "FETCH_ADDRESSES_AFTER_DELETE":
      if (action.payload.deleted) {
        return state.filter((address) => address.ID !== action.payload.deleted);
      }
      return state;
    default:
      return state;
  }
}
