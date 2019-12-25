import React, {Component} from "react";
import {connect} from "react-redux";
import  * as actions from "../../../actions";
class CartButton extends Component{
    constructor(props){
        super(props);
        // console.log(props);
        // debugger;
        let currentQuantity = 0;
        if(props.orderValues && props.orderValues.orderItems && props.orderValues.orderItems.length){
            let orderItemIndex = props.orderValues.orderItems.findIndex(oItem => oItem.item._id == props.currentItem._id);
            if(orderItemIndex > -1){
                currentQuantity = props.orderValues.orderItems[orderItemIndex].quantity;
            }
        }
        this.state = {
            quantity: currentQuantity,
            new: true
        }
        let orderSess = JSON.parse(localStorage.orderSession);
        console.log(orderSess);
        let { order } = orderSess;
        let currentItem = order.orderItems.filter(thisItem => thisItem.item._id == props.currentItem._id);
        if (currentItem.length > 0){
            console.log(currentItem);
            this.state.new = false;
        }

    }
    async addItem(item){
        // console.log("from add items");
        // console.log(this.props);
        // debugger;
        if(this.props.orderValues && this.props.orderValues.user){
            const values  = {
                order: this.props.orderValues,
                item,
                user: this.props.user ? this.props.user : {},
                orderItems: this.props.orderValues.orderItems ? this.props.orderValues.orderItems : []
            }
            await this.props.addItemToOrder(values);
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

    async removeItem(item){
        console.log(this.props);
        if(this.props.orderValues && this.props.orderValues.user){
            const values  = {
                order: this.props.orderValues,
                item,
                user: this.props.user ? this.props.user : {},
                orderItems: this.props.orderValues.orderItems ? this.props.orderValues.orderItems : []
            }
            await this.props.removeItemFromOrder(values);
            let newQuan = this.state.quantity - 1;
            // if(newQuan){

            // }
            this.setState({quantity: newQuan});
            if(newQuan == 0){
                this.setState({new: true});
            }
        }
    }
    async addNewItemToOrder(item){
        let orderSess = JSON.parse(localStorage.orderSession);
        console.log(orderSess);
        let { order } = orderSess;
        let currentItem = order.orderItems.filter(thisItem => thisItem.item._id == item._id);
        if (currentItem.length > 0){
            console.log(currentItem);
        }else{
            if(this.props.orderValues && this.props.orderValues.user){
                const values  = {
                    order: this.props.orderValues,
                    item,
                    user: this.props.user ? this.props.user : {},
                    orderItems: this.props.orderValues.orderItems ? this.props.orderValues.orderItems : []
                }
                await this.props.addItemToOrder(values);
                this.setState({quantity: this.state.quantity+=1});
                this.setState({new: false});
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
                this.setState({new: false});
            }
        }
    }
    render(){
        if(this.state.new){
            return(
                <div className="right floated content">
                    <button className="ui primary button" onClick={()=>this.addNewItemToOrder(this.props.currentItem)}>
                         +
                    </button>
                </div>
            );
        }
        

        return(
            <div className="right floated content">
                <button className="ui primary button" onClick={()=>this.addItem(this.props.currentItem)}>
                    +
                </button>
                <div className="ui teal label"> {this.state.quantity} </div>
                <button className="ui button" onClick={()=>this.removeItem(this.props.currentItem)}>
                    -
                </button>                   
            </div>
        );
    }
}
function mapStateToProps(state){
    // console.log(state);
    return{
        user: state.auth
    }

}
export default connect(mapStateToProps, actions)(CartButton);