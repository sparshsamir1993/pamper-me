import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import AddressSearchField from "./AddressSearchField";
import "../../../styles/main.scss";

class AddressForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.processAddress)}>
        <label>Give a nickname to your address</label>
        <Field name="addressName" component="input" />
        <Field name="userAddress" component={AddressSearchField} />
        <label>Additional Details</label>
        <Field name="additionalDirections" component="textarea" />
        <button
          className="btn-flat right white-text submit-button"
          type="submit"
        >
          <i className="material-icons right">done</i>
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: "userAddressForm"
})(AddressForm);
