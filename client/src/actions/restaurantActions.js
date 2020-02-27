import axios from 'axios';

export const fetchUserRestaurants = () => async (dispatch) =>{
    console.log("eeeee");
    const res = await axios.get("/api/restaurants");
    console.log(res);

    dispatch({ type: "FETCH_RESTAURANTS", payload: res.data});
}

export const fetchRestaurants = () => async (dispatch) =>{
    const res = await axios.get("/api/admin/restaurants");

    dispatch({ type: "FETCH_RESTAURANTS", payload: res.data});
}

export const getRestaurantItems = (values) => async (dispatch) =>{
    // console.log(values);
    const res = await axios.get("/api/admin/restaurants/items",  {
        params: {
            selectedRestaurant: values.selectedRestaurant
        }
    });
    console.log(res);

    dispatch({ type: "FETCH_ITEMS", payload: res.data});
}

export const fetchUserRestaurantsItems = (values) => async (dispatch) =>{
    console.log(values);
    const res = await axios.get("/api/admin/restaurants/items",  {
        params: {
            selectedRestaurant: values.selectedRestaurant
        }
    });
    console.log(res);

    dispatch({ type: "FETCH_ITEMS", payload: res.data});
}