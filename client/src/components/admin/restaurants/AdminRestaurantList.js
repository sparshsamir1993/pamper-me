import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRestaurants, setRestaurant } from "../../../actions";
import { Link } from "react-router-dom";

class AdminRestaurantList extends Component {
  componentDidMount() {
    this.props.fetchRestaurants();
  }

  renderList() {
    if (this.props.restaurants && this.props.restaurants.length > 0) {
      return this.props.restaurants.reverse().map(restaurant => {
        return (
          <div className="card seven wide column" key={restaurant.ID}>
            <div className="content">
              <div className="header">{restaurant.name}</div>
              <div className="description">
                Phone Number : {restaurant.phoneNumber}
              </div>
            </div>
            <Link
              className="ui bottom attached button"
              to="/admin/restaurants/items"
              onClick={() => this.props.setRestaurant(restaurant)}
            >
              <i className="add icon"></i>
              Check Out
            </Link>
            <button
              className="ui bottom attached button"
              onClick={() =>
                this.props.history.push({
                  pathname: "/admin/restaurants/new",
                  state: {
                    selectedRestaurant: restaurant
                  }
                })
              }
            >
              <i className="add icon"></i>
              Edit
            </button>
          </div>
        );
      });
    } else {
      return <div></div>;
    }
  }

  render() {
    // console.log(this.props);
    return (
      <div className="ui container">
        <div className="ui cards grid">{this.renderList()}</div>

        <Link to="/admin/restaurants/new" className="ui button primary">
          Create Restaurant
        </Link>
      </div>
    );
  }
}
function mapStateToProps(state) {
  // console.log(state);
  return {
    restaurants: state.restaurants
  };
}
export default connect(mapStateToProps, { fetchRestaurants, setRestaurant })(
  AdminRestaurantList
);
