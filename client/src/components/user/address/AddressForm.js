import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import AddressSearchField from "./AddressSearchField";
import "../../../styles/main.scss";
import { connect } from "mongoose";

class AddressForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.processAddress)}>
        <label>Give a nickname to your address</label>
        <Field key="name" name="name" component="input" type="text" />
        <Field
          key="detailedAddress"
          name="detailedAddress"
          component={AddressSearchField}
          type="text"
          {...{
            initialValue: this.props.initialValues
              ? this.props.initialValues.detailedAddress
              : "",
          }}
        />
        <label>Additional Details</label>
        <Field
          key="additionalDirections"
          name="additionalDirections"
          component="textarea"
          type="text"
        />
        <div>
          <label htmlFor="defaultAddress">Default Address</label>
          <div>
            <Field
              name="defaultAddress"
              id="defaultAddress"
              component="input"
              type="checkbox"
              className="filled-in"
            />
          </div>
        </div>
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
AddressForm = reduxForm({
  form: "userAddressForm",
  enableReinitialize: true,
})(AddressForm);

// AddressForm = connect(state=>({initialValues: }))

export default AddressForm;
