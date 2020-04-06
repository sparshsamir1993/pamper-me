import React, { Component } from "react";
import CreditCard from "./creditCard";
import CashOnDelivery from "./cashOnDelivery";

class Checkout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        This is checkout{" "}
        {this.props.location.state.currentAddress.detailedAddress}
        <div className="row">
          <div className="col s12">
            <ul className="tabs">
              <li className="tab col s3">
                <a className="active" href="#creditcard">
                  Credit Card
                </a>
              </li>
              <li className="tab col s3">
                <a href="#cash">Cash on Delivery</a>
              </li>
            </ul>
          </div>
          <div id="creditcard" className="col s12">
            <CreditCard />
          </div>
          <div id="cash" className="col s12">
            <CashOnDelivery />
          </div>
        </div>
      </div>
    );
  }
}

export default Checkout;
