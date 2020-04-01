import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import AddressSearchField from "./AddressSearchField";

class AddressForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.processAddress)}>
        <label>Give a nickname to your address</label>
        <Field name="addressName" component="input" />
        <Field name="userAddress" component={AddressSearchField} />
        <label>Additional Details</label>
        <Field name="additonalDirections" component="textarea" />
        <button className="teal btn-flat right white-text" type="submit">
          <i className="material-icons right">done</i>
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: "userAddressForm"
})(AddressForm);
