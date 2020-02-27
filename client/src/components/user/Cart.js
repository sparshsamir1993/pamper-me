import React, {Component} from 'react';
import { connect } from 'react-redux';
import CartButtons from './utilities/CartButton';

class Cart extends Component{

    renderOrderItems(){
        const relativeStyle = {
            position: 'relative'
        };
        const cartButtonPosition = {
            position: 'absolute',
            right: '10px',
            top:'50%',
            transform: 'translateY(-50%)'
        }
        return this.props.orderItems.map(oItem => {
            let currItem = this.props.items.filter(item => item.ID == oItem.itemID );
            // debugger;
            if(currItem.length){
                return(
                    <li className="collection-item" style={relativeStyle}>
                        <h3>{currItem[0].name}</h3>
                        <div className="secondary-content" style={cartButtonPosition}>
                            
                            <CartButtons 
                                orderValues={this.props.order} 
                                addToCartClick={this.props.addItemToOrder} 
                                currentItem={currItem[0]} />
                        </div>

                    </li>
                )
            }
        })
    }


    renderList(){
        // debugger;
        if(this.props.orderItems && this.props.orderItems.length > 0){
                return(
                    <div>
                        <ul class="collection">
                            {this.renderOrderItems()}
                        </ul>
                    </div>         
                );
        }

    }
    render(){
        return(
            <div>
                {this.renderList()}
            </div>
        );
    }
}
function mapStateToProps(state){
    console.log(state);
    let items = [];
    let {order} = state;
    if(state.restaurants.length){
        state.restaurants.map(rest => {
            items.push(...rest.Items);
        })
    }
    if(!Object.keys(order).length){
        order = window.localStorage.orderSession ? JSON.parse(window.localStorage.orderSession).order : order
    }
    // let orderItems = order.orderItems;

    return{
        order,
        orderItems: order.OrderItems,
        items
    }
    
}
export default connect(mapStateToProps)(Cart);