import React, { Component } from "react";
import { connect } from "react-redux";
import CartButtons from "./utilities/CartButton";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grandTotal: 0,
    };
  }
  componentDidMount() {
    // debugger;
    // this.setState({grandTotal});
  }
  renderOrderItems() {
    const relativeStyle = {
      position: "relative",
    };
    const cartButtonPosition = {
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
    };
    return this.props.orderItems.map((oItem) => {
      let currItem = this.props.items.filter((item) => item.ID == oItem.itemID);
      // debugger;
      if (currItem.length) {
        return (
          <li
            className="collection-item"
            key={currItem[0].ID}
            style={relativeStyle}
          >
            <h3>{currItem[0].name}</h3>
            <p>
              {currItem[0].price} &nbsp; x &nbsp; {oItem.quantity} &nbsp; =
              &nbsp; {currItem[0].price * oItem.quantity}
            </p>
            <div className="secondary-content" style={cartButtonPosition}>
              <CartButtons
                orderValues={this.props.order}
                addToCartClick={this.props.addItemToOrder}
                currentItem={currItem[0]}
              />
            </div>
          </li>
        );
      }
    });
  }
  placeOrder = () => {
    console.log(this.props);
    console.log(this.state);
    if (!this.props.auth.currentAddress) {
      console.log("no address");
    }
  };
  renderList() {
    // debugger;
    if (this.props.orderItems && this.props.orderItems.length > 0) {
      return (
        <div>
          <ul className="collection">{this.renderOrderItems()}</ul>
          <hr></hr>
          <div className="grand-total">
            <h5>
              Grand Total &nbsp; : &nbsp; {this.props.grandTotal.toFixed(2)}
            </h5>
          </div>
          <div className="place-order-section">
            <a className="btn-large" onClick={this.placeOrder}>
              Place order
            </a>
          </div>
        </div>
      );
    }
  }
  render() {
    return <div>{this.renderList()}</div>;
  }
}
function mapStateToProps(state) {
  console.log(state);
  let items = [];
  let { order, auth } = state;
  if (state.restaurants.length) {
    state.restaurants.map((rest) => {
      items.push(...rest.Items);
    });
  }
  if (!Object.keys(order).length) {
    order = window.localStorage.orderSession
      ? JSON.parse(window.localStorage.orderSession).order
      : order;
  }
  let grandTotal = 0;
  if (order.OrderItems && order.OrderItems.length && items.length) {
    order.OrderItems.map((oItem) => {
      // debugger;
      const { itemID, quantity } = oItem;
      const item = items.filter((i) => i.ID == itemID)[0];
      grandTotal += item.price * quantity;
    });
  }
  // let orderItems = order.orderItems;
  return {
    order,
    orderItems: order.OrderItems,
    items,
    grandTotal,
    auth,
  };
}
export default connect(mapStateToProps)(Cart);
