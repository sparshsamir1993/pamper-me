import React, {Component} from "react";

class AdminRestaurantItemsNew  extends Component{
    render(){
        console.log(this.props.location.state.restaurant)
        return(
            <div>New item form</div>
        );
    }
}
export default AdminRestaurantItemsNew;