import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "../styles/main.scss";
import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import AdminRestaurantList from "./admin/restaurants/AdminRestaurantList";
import AdminRestaurantNew from "./admin/restaurants/AdminRestaurantNew";
import AdminRestaurantItemList from "./admin/restaurantItems/AdminRestaurantItemsList";
import AdminRestaurantItemNew from "./admin/restaurantItems/AdminRestaurantItemsNew";
import UserProfile from "./user/profile/UserProfile";
import ManageAddress from "./user/profile/ManageAddress";
import AddressNew from "./user/address/AddressNew";
import Checkout from "./order/checkout";
import RestaurantList from "./user/RestaurantList";
import RestaurantItemList from "./user/RestaurantItemList";
import Cart from "./user/Cart";
import Header from "./Header";
import * as actions from "../actions";
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchUserRestaurants();
    let { order } = window.localStorage.orderSession
      ? JSON.parse(window.localStorage.orderSession)
      : {};
    console.log(this.props);
    if (order && order.ID && !this.props.order.ID) {
      this.props.fetchCurrentOrder(order.ID);
    }
  }
  render() {
    return (
      <div className="app-background">
        <BrowserRouter>
          <div>
            <Header />
            <div className="container">
              <Route exact path="/" />
              <Route
                exact
                path="/admin/restaurants"
                component={AdminRestaurantList}
              />
              <Route
                exact
                path="/admin/restaurants/new"
                component={AdminRestaurantNew}
              />
              <Route
                exact
                path="/admin/restaurants/items"
                component={AdminRestaurantItemList}
              />
              <Route
                exact
                path="/admin/restaurants/items/new"
                component={AdminRestaurantItemNew}
              />
              <Route exact path="/restaurants" component={RestaurantList} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/checkout*" component={Checkout} />
              <Route
                exact
                path="/restaurants/:restaurantId/items"
                component={RestaurantItemList}
              />
              <Route exact path="/profile" component={UserProfile} />
              <Route exact path="/manageAddress" component={ManageAddress} />
              <Route exact path="/addressNew" component={AddressNew} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps, actions)(App);
