import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../../../actions";

class AdminRestaurantItemsList extends Component{
    constructor(props){
        super(props);

        this.state = {
            selectedRestaurant : {}
        }
        // debugger;
        if(this.props.selectedRestaurant.name || (this.props.location.state && this.props.location.state.selectedRestaurant)){
            let selRes = this.props.selectedRestaurant;
            if(!selRes.name){
                selRes = this.props.location.state.selectedRestaurant;
            }

            this.state = {
                ...this.state,
                selectedRestaurant : selRes
            }
        }
    }
    componentDidMount(){
        console.log(this.props);
        console.log(this.state);
        if(this.state.selectedRestaurant){
            console.log(this.state.selectedRestaurant._id);
            const values = {selectedRestaurant: this.state.selectedRestaurant._id};
            this.props.getRestaurantItems(values);
        }
        if(!this.state.selectedRestaurant.name){
            this.props.history.goBack();
        }        
    }
    renderItemList(){
        let selectedRestaurant = this.state.selectedRestaurant;
        return this.props.items.map(item=>{
            return(
                <div className="item" key={item._id}>
                    <div className="right floated content">
                        <button className="ui primary button" onClick={()=> this.props.history.push({
                            pathname: "/admin/restaurants/items/new",
                            state: { item: item }
                        })}>
                            Edit
                        </button>
                        <button className="ui inverted red button" onClick={()=> this.props.deleteRestaurantItem({item, selectedRestaurant}, this.props.history)}>
                            Delete
                        </button>
                    </div>
                    <div className="content flex-d">
                        <div className="">
                            <h4>{item.name}</h4>
                        </div>
                        <div className="">
                            {item.type}
                        </div>
                        <div className="">
                            {item.price} {'\u00A0'} CAD
                        </div>
                    </div>
                </div>
            );
        })
    }
    render(){
        const {name, phoneNumber, restaurantItems} = this.props.selectedRestaurant;

        return(
            <div className="ui container">
                <div className="ui middle aligned divided list">
                    {this.renderItemList()}
                </div>

                <div className="ui button" onClick={()=> this.props.history.push({
                    pathname:"/admin/restaurants/items/new",
                    state: {
                        selectedRestaurant: this.state.selectedRestaurant
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