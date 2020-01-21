import axios from 'axios';

export const loadInitailItemFormValues = (item) =>{
    return{
        type: "LOAD_ITEM_VALUES",
        payload: item
    }

}

export const fetchUser = () => async (dispatch) =>{
    const res = await axios.get("/api/current_user");

    dispatch({ type: "FETCH_USER", payload: res.data });//for updating data. Dispatching new and updating it on the browser
  };


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

export const setRestaurant =(restaurant) =>{
    return{
        type:"SELECTED_RESTAURANT",
        payload: restaurant
    }
}

// ORDERING ACTIONS


export const addItemToOrder = (values, history) => async (dispatch) =>{

    const res = await axios.post("/api/order/addItem",values);
    console.log(res);
    let response = res.data;
    // console.log(response);
    if(typeof(res.data) === "string"){
        response  = JSON.parse(res.data);
    }
    else if(typeof(res.data) === "object"){
        response = JSON.stringify(res.data);
    }
    
    if(res.data.order){
        localStorage.setItem("orderSession", response);
    }
    dispatch({type:"FETCH_ORDER", payload: res.data.order});
    console.log("dispatched");
}

export const removeItemFromOrder = (values, history) => async (dispatch) =>{
    // debugger
    const res = await axios.post("/api/order/removeItem", values);
    // console.log(res);
    // console.log(response);
    let response = res.data;
    if(typeof(res.data) === "string"){
        response  = JSON.parse(res.data);
    }
    else if(typeof(res.data) === "object"){
        response = JSON.stringify(res.data);
    }
    
    if(res.data.order){
        localStorage.setItem("orderSession", response);
    }
    dispatch({type:"FETCH_ORDER", payload: res.data.order});
    console.log("dispatched");
}

// export const addItemToState = (values, history) =>{

// }