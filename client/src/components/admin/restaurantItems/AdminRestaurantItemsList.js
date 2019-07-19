import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../../../actions";

class AdminRestaurantItemsList extends Component{
    componentDidMount(){
        console.log(this.props);
        if(this.props.selectedRestaurant){
            console.log(this.props.selectedRestaurant._id);
            const values = {selectedRestaurant: this.props.selectedRestaurant._id};
            this.props.getRestaurantItems(values);
        }
        if(!this.props.selectedRestaurant.name){
            this.props.history.goBack();
        }        
    }
    renderItemList(){
        return this.props.items.map(item=>{
            return(
                <div className="item" key={item.name}>
                    <div className="right floated content">
                        <button className="ui primary button">
                            Save
                        </button>
                        <button className="ui button">
                            Discard
                        </button>
                    </div>
                    <div className="content">
                        {item.name}
                    </div>
                </div>
            );
        })
    }
    render(){
        // console.log(this.props);
        const {name, phoneNumber, restaurantItems} = this.props.selectedRestaurant;

        return(
            <div className="ui container">
                <div className="ui middle aligned divided list">
                    {this.renderItemList()}
                </div>

                <div className="ui button" onClick={()=> this.props.history.push({
                    pathname:"/admin/restaurants/items/new",
                    state: {
                        restaurant: this.props.selectedRestaurant
                    }
                })}>
                    Create Item
                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    console.log(state);
    return{
        items: state.restaurantItems,
        selectedRestaurant: state.selectedRestaurant
    };
}
export default connect(mapStateToProps, actions)(AdminRestaurantItemsList);