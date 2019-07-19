import React, {Component} from "react";
import {connect} from "react-redux";
import  * as actions from "../../../actions";
class CartButton extends Component{
    constructor(props){
        super(props);
        console.log(props);
        // debugger;
        let currentQuantity = 0;
        if(props.orderValues && props.orderValues.orderItems && props.orderValues.orderItems.length){
            let orderItemIndex = props.orderValues.orderItems.findIndex(oItem => oItem.item._id == props.currentItem._id);
            if(orderItemIndex > -1){
                currentQuantity = props.orderValues.orderItems[orderItemIndex].quantity;
            }
        }
        this.state = {
            quantity: currentQuantity
        }
    }
    addItem(item){
        console.log("from add items");
        console.log(this.props);
        // debugger;
        if(this.props.orderValues && this.props.orderValues.user){
            const values  = {
                order: this.props.orderValues,
                item,
                user: this.props.user ? this.props.user : {},
                orderItems: this.props.orderValues.orderItems ? this.props.orderValues.orderItems : []
            }
            this.props.addItemToOrder(values);
            this.setState({quantity: this.state.quantity+=1});
        }
        else {
            const values = {
                order: null,
                item,
                user: this.props.user ? this.props.user : null,
                orderItems: this.props.orderValues && this.props.orderValues.orderItems ? this.props.orderValues.orderItems: null
            };
            this.props.addItemToOrder(values);
            this.setState({quantity: this.state.quantity+=1});
        }
    }
    render(){
        return(
            <div className="right floated content">
                <button className="ui primary button" onClick={()=>this.addItem(this.props.currentItem)}>
                    +
                </button>
                <div className="ui teal label"> {this.state.quantity} </div>
                <button className="ui button">
                    -
                </button>                   
            </div>
        );
    }
}
function mapStateToProps(state){
    console.log(state);
    return{
        user: state.auth
    }

}
export default connect(mapStateToProps, actions)(CartButton);