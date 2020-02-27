import axios from 'axios';
export const createNewRestaurant = (values, history) => async (dispatch) =>{
    console.log(values);
    const res = await axios.post("/api/admin/restaurants/create", {values});
    history.push("/admin/restaurants");
    dispatch({ type: "FETCH_RESTAURANTS", payload: res.data});
}

export const createNewRestaurantItem = (values, history) => async (dispatch) =>{
    console.log(values);
    const res = await axios.post("/api/admin/restaurants/items/create", {values});
    history.push("/admin/restaurants/items");
    dispatch({ type: "FETCH_RESTAURANTS", payload: res.data});
}
export const editRestaurantItem = (values, history) => async (dispatch) =>{
    console.log(values);
    const res = await axios.post("/api/admin/restaurants/items/update", {values});
    history.push("/admin/restaurants/items");
    dispatch({ type: "FETCH_RESTAURANTS", payload: res.data});
}

export const deleteRestaurantItem = (values, history) => async (dispatch) =>{
    const res = await axios.post("/api/admin/restaurants/items/delete", {values});
    debugger;
    history.push({
        pathname:"/admin/restaurants/items",
        state: {selectedRestaurant: values.selectedRestaurant}
    });
    dispatch({ type: "FETCH_RESTAURANTS", payload: res.data});
}
