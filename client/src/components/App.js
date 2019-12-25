import 'materialize-css'; 
import 'materialize-css/dist/css/materialize.min.css';
import '../styles/main.css';
import React, { Component } from  'react';
import {connect} from "react-redux";
import { BrowserRouter, Route} from 'react-router-dom';
import AdminRestaurantList from "./admin/restaurants/AdminRestaurantList";
import AdminRestaurantNew from "./admin/restaurants/AdminRestaurantNew";
import AdminRestaurantItemList  from "./admin/restaurantItems/AdminRestaurantItemsList";
import AdminRestaurantItemNew  from "./admin/restaurantItems/AdminRestaurantItemsNew";
import RestaurantList from "./user/RestaurantList";
import RestaurantItemList from "./user/RestaurantItemList";
import Header from "./Header";
import * as actions from "../actions";
class App extends Component{
    componentDidMount(){
        this.props.fetchUser();
    }
    render(){
        return(
            <div>
                <BrowserRouter>
                    <div>
                        <Header/>
                        <div className="container">
                            <Route exact path="/" />
                            <Route exact path="/admin/restaurants" component={AdminRestaurantList}/>
                            <Route exact path="/admin/restaurants/new" component={AdminRestaurantNew}/>
                            <Route exact path="/admin/restaurants/items" component={AdminRestaurantItemList}/>
                            <Route exact path="/admin/restaurants/items/new" component={AdminRestaurantItemNew}/>
                            <Route exact path="/restaurants" component={RestaurantList}/>
                            <Route exact path="/restaurants/:restaurantId/items" component={RestaurantItemList}/>
                
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );

    }
}
export default connect(null, actions)(App);