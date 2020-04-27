import React, { Component } from "react";
import CreditCard from "./creditCard";
import CashOnDelivery from "./cashOnDelivery";
import M from "materialize-css";

class Checkout extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  componentWillMount() {
    if (!this.props.location?.state?.currentAddress) {
      //ES 20 baby!!
      this.props.history.goBack();
    }
  }
  componentDidMount() {
    let tabs = document.getElementById("paymentTabs");
    M.Tabs.init(tabs, {});
    const instance = M.Tabs.getInstance(tabs);
    let cc = document.getElementById("creditcard");
  }
  render() {
    return (
      // <div>
      <div className="row">
        <div className="col s12">
          <ul className="tabs" id="paymentTabs">
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
          <CreditCard
            currentAddress={this.props.location?.state?.currentAddress}
            grandTotal={this.props.location?.state?.grandTotal}
            order={this.props.location?.state?.order}
            history={this.props.history}
          />
        </div>
        <div id="cash" className="col s12">
          <CashOnDelivery
            currentAddress={this.props.location?.state?.currentAddress}
            grandTotal={this.props.location?.state?.grandTotal}
            order={this.props.location?.state?.order}
            history={this.props.history}
          />
        </div>
      </div>
      // </div>
    );
  }
}

export default Checkout;
