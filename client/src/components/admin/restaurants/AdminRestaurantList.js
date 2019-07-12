import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRestaurants } from "../../../actions";
import _ from 'lodash';

class AdminRestaurantList extends Component {
    componentDidMount(){
        this.props.fetchRestaurants();
    }

    renderList(){
        if(this.props.restaurants && this.props.restaurants.length > 0){
            return this.props.restaurants.reverse().map( restaurant => {
                return(
                    
                    <div className="card seven wide column" key={restaurant._id}>
                        <div className="content">
                        <div className="header">{restaurant.name}</div>
                        <div className="description">
                            Phone Number : {restaurant.phoneNumber}
                        </div>
                        </div>
                        <div className="ui bottom attached button" onClick={()=>this.props.history.push({
                                pathname:"/admin/restaurants/items",
                                state: {restaurant}
                            })}>
                            <i className="add icon"></i>
                            Check Out
                        </div>
                    </div>
                
                );
            });
        }else{
            return(
                <div>Nothing here</div>
            );
        }

    }

    render(){
        console.log(this.props);
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
        restaurants : state.restaurants
    }
}
export default connect(mapStateToProps,{fetchRestaurants})(AdminRestaurantList);