import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from "../../actions";
import CartButtons from "./utilities/CartButton";
class RestaurantItemList extends Component {
    componentDidMount(){
        if(!this.props.selectedRestaurant.name ){
            this.props.history.goBack();
        }else{
            const values = {selectedRestaurant: this.props.selectedRestaurant._id};
            this.props.fetchUserRestaurantsItems(values);
        }
        // console.log(this.props);
    }

    renderList(){
        const orderItems = this.props.orderItems;
        if(this.props.restaurantItems && this.props.restaurantItems.length > 0){
            return this.props.restaurantItems.map( item => {
                
                return(
                    
                    <div className="item" key={item._id}>
                        <CartButtons orderValues={this.props.order} addToCartClick={this.props.addItemToOrder} currentItem={item} />
                        <div className="content">
                            <div className="header">{item.name}</div>
                            <div className="description">
                                ${item.price}
                            </div>
                        </div>
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
                <div className="ui middle aligned divided list">
                    {this.renderList()}
                </div>
            </div>

        );
    }
}

function mapStateToProps(state){
    console.log(state);
    // debugger;
    let order = state.order.length ? state.order : null;
    order = !order && localStorage.getItem('orderSession') ? JSON.parse(localStorage.getItem('orderSession')).order : null;
    let orderItems = state.orderItems ? state.orderItems : null;
    orderItems = !orderItems.length && order && order.length ? order.orderItems : null;
    return{
        selectedRestaurant:  state.selectedRestaurant,
        restaurantItems: state.restaurantItems,
        order: order,
        orderItems: orderItems,
        user: state.auth
    }
}
// const {fetchUserRestaurants} = actions;
export default connect(mapStateToProps, actions)(RestaurantItemList);