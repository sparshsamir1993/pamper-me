import React, {Component} from "react";
import {connect} from "react-redux";
import  * as actions from "../../../actions";
class CartButton extends Component{
    constructor(props){
        super(props);
        // console.log(props);
        let currentQuantity = 0;
        // debugger;
        if(props.orderValues && props.orderValues.OrderItems && props.orderValues.OrderItems.length){
            let orderItemIndex = props.orderValues.OrderItems.findIndex(oItem => oItem.itemID == props.currentItem.ID);
            if(orderItemIndex > -1){
                currentQuantity = props.orderValues.OrderItems[orderItemIndex].quantity;
            }
        }
        this.state = {
            quantity: currentQuantity,
            new: true
        }
        
        if(localStorage.orderSession){
            let orderSess = JSON.parse(localStorage.orderSession);
            // console.log(orderSess);
            let { order } = orderSess;
            let currentItem = order.OrderItems.filter(thisItem => thisItem.itemID == props.currentItem.ID);
            if (currentItem.length > 0){
                // console.log(currentItem);
                this.state.new = false;
            }
        }
    }
    async addItem(item){
        // console.log("from add items");
        // console.log(this.props);
        // debugger;
        this.setState({quantity: this.state.quantity+=1});
        if(this.props.orderValues){
            const values  = {
                order: this.props.orderValues,
                item,
                user: this.props.user ? this.props.user : {},
                orderItems: this.props.orderValues.orderItems ? this.props.orderValues.orderItems : [],
                newQuantity: this.state.quantity
            }
            await this.props.addItemToOrder(values);
            
        }
        else {
            this.setState({quantity: this.state.quantity+=1});
            const values = {
                order: null,
                item,
                user: this.props.user ? this.props.user : null,
                orderItems: this.props.orderValues && this.props.orderValues.orderItems ? this.props.orderValues.orderItems: null,
                newQuantity: this.state.quantity
            };
            await this.props.addItemToOrder(values);
            
        }
    }

    async removeItem(item){
        // console.log(this.props);
        let newQuan = this.state.quantity - 1;
        this.setState({quantity: newQuan});
        if(this.props.orderValues && this.props.user){
            const values  = {
                order: this.props.orderValues,
                item,
                user: this.props.user ? this.props.user : {},
                orderItems: this.props.orderValues.orderItems ? this.props.orderValues.orderItems : [],
                newQuantity: newQuan
            }
            await this.props.removeItemFromOrder(values);
            
            if(newQuan == 0){
                this.setState({new: true});
            }
        }
    }
    async addNewItemToOrder(item){
        debugger;
        let orderSess = localStorage.orderSession ? JSON.parse(localStorage.orderSession) : {};
        // console.log(orderSess);
        let { order } = orderSess;
        let currentItem;
        if (order){
            currentItem = order.OrderItems.filter(thisItem => thisItem.itemID == item.ID);
            // console.log(currentItem);
            const values  = {
                order,
                item,
                user: this.props.user ? this.props.user : {},
                orderItems: this.props.orderValues.OrderItems ? this.props.orderValues.OrderItems : order.OrderItems
            }
            await this.props.addItemToOrder(values);
            this.setState({quantity: this.state.quantity+=1});
            this.setState({new: false});
        }else{
            if(this.props.orderValues && this.props.orderValues.user){
                const values  = {
                    order: this.props.orderValues,
                    item,
                    user: this.props.user ? this.props.user : {},
                    orderItems: this.props.orderValues.OrderItems ? this.props.orderValues.OrderItems : []
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
                    orderItems: this.props.orderValues && this.props.orderValues.OrderItems ? this.props.orderValues.OrderItems: null
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