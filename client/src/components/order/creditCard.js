import React from "react";
import StripeCheckout from "react-stripe-checkout";

class CreditCard extends React.Component {
  onToken = (token) => {
    console.log("token is", token);
  };

  // ...

  render() {
    return (
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_mrBxdsOdipIPNYqv2Vg5bFQ9"
      />
    );
  }
}

export default CreditCard;
