import React, {Component} from "react";

class AdminRestaurantItemsList extends Component{
    render(){
        console.log(this.props.location.state);
        const {name, phoneNumber, restaurantItems} = this.props.location.state.restaurant;
        return(
            <div>
                {name} {phoneNumber}
                <div className="button" onClick={()=> this.props.history.push({
                    pathname:"/admin/restaurants/items/new",
                    state: {
                        restaurant: this.props.location.state.restaurant
                    }
                })}>
                    Create Item
                </div>
            </div>
        );
    }
}

export default AdminRestaurantItemsList;