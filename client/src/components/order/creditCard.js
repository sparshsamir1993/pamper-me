import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";

import { createPayment } from "../../actions";
import { CREDIT_CARD } from "../../clientConstants";

class CreditCard extends React.Component {
  constructor(props) {
    super(props);
  }
  onToken = (token) => {
    this.props.createPayment(
      {
        paymentType: CREDIT_CARD,
        grandTotal: this.props.grandTotal,
        order: this.props.order,
        currentAddress: this.props.currentAddress,
        stripeToken: token,
        paymentSuccessful: true,
      },
      this.props.history
    );
  };

  render() {
    const payButtonWrapper = {
      width: "100%",
      paddingTop: "100px",
      paddingBottom: "100px",
      marginTop: "5px",
      display: "flex",
      justifyContent: "center",
      backgroundColor: "white",
    };
    return (
      <div style={payButtonWrapper}>
        <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_mrBxdsOdipIPNYqv2Vg5bFQ9"
        />
      </div>
    );
  }
}

export default connect(null, { createPayment })(CreditCard);
