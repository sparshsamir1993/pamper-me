import axios from 'axios';


export const fetchRestaurants = () => async (dispatch) =>{
    const res = await axios.get("/api/admin/restaurants");

    dispatch({ type: "FETCH_RESTAURANTS", payload: res.data});
}

export const createNewRestaurant = (values, history) => async (dispatch) =>{
    console.log(values);
    const res = await axios.post("/api/admin/restaurants/create", {values});
    history.push("/admin/restaurants");
    dispatch({ type: "FETCH_RESTAURANTS", payload: res.data});
}