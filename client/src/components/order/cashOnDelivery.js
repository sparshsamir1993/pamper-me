import React, { Component } from "react";
import { connect } from "react-redux";
import { CASH_ON_DELIVERY } from "../../clientConstants";
import { createPayment } from "../../actions";
class CashOnDelivery extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    const codWrapper = {
      width: "100%",
      backgroundColor: "white",
      marginTop: "5px",
      paddingTop: "10px",
      paddingBottom: "20px",
      paddingLeft: "10px",
    };
    return (
      <div style={codWrapper}>
        <h4>You are about to place an order at,</h4>
        <h6>{this.props.currentAddress.detailedAddress}</h6>
        <h6>
          The delivery personal will contact you at &nbsp;{" "}
          {this.props.user.email}
        </h6>
        <br></br>
        <h5>Your order total is ${this.props.grandTotal}</h5>
        <div className="place-order-btn-wrap">
          <a
            className="btn-large"
            onClick={() =>
              this.props.createPayment({
                paymentType: CASH_ON_DELIVERY,
                grandTotal: this.props.grandTotal,
                order: this.props.order,
                currentAddress: this.props.currentAddress,
              })
            }
          >
            Place Order
          </a>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  // console.log(state);
  return {
    user: state.auth,
  };
}
export default connect(mapStateToProps, { createPayment })(CashOnDelivery);
