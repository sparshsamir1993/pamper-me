import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from "../../actions";
import { Link } from "react-router-dom";
class RestaurantList extends Component {
    componentDidMount(){
        this.props.fetchUserRestaurants();
        // console.log(this.props);
    }
    renderList(){
        if(this.props.restaurants && this.props.restaurants.length > 0){
            return this.props.restaurants.map( restaurant => {
                return(
                    
                    <div className="card seven wide column" key={restaurant._id}>
                        <div className="content">
                        <div className="header">{restaurant.name}</div>
                        <div className="description">
                            Phone Number : {restaurant.phoneNumber}
                        </div>
                        </div>
                        <Link className="ui bottom attached button" to={`/restaurants/${restaurant._id}/items`} onClick={()=>this.props.setRestaurant(restaurant)}>
                            <i className="add icon"></i>
                            Check Out
                        </Link>
                    </div>
                
                );
            });
        }else{
            return(
                <div></div>
            );
        }

    }

    render(){
        // console.log(this.props);
        return(
            <div className="ui container">
                <div className="ui cards grid">
                    {this.renderList()}
                </div>
            </div>

        );
    }
}

function mapStateToProps(state){
    console.log(state);
    return{
        restaurants: state.restaurants
    }
}
// const {fetchUserRestaurants} = actions;
export default connect(mapStateToProps, actions)(RestaurantList);