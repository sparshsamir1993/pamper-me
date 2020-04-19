import React from "react";
import StripeCheckout from "react-stripe-checkout";

class CreditCard extends React.Component {
  onToken = (token) => {
    console.log("token is", token);
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

export default CreditCard;
