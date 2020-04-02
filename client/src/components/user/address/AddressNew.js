import React, { Component } from "react";
import AddressForm from "./AddressForm";
import { connect } from "react-redux";
import { geocodeByAddress } from "react-places-autocomplete";
import * as actions from "../../../actions";
import { CANADA } from "../../../clientConstants";
import "../../../styles/main.scss";
class AddressNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isError: false,
      errorMessage: ""
    };
  }
  async processAddressFromData(addressValues) {
    console.log(addressValues);
    const result = await geocodeByAddress(addressValues.values.userAddress);
    console.log(result);
    const addressComponents = result[0].address_components;
    let details = {};

    addressComponents.map(component => {
      this.setState({ isError: false });
      const { types, long_name } = component;
      if (types.includes("street_number")) {
        details.buildingNumber = long_name;
      }
      if (types.includes("route")) {
        details.street = long_name;
      }
      if (types.includes("sublocality")) {
        details.city = long_name;
      }
      if (types.includes("locality")) {
        details.city = details.city
          ? details.city + ` ${long_name}`
          : long_name;
      }
      if (types.includes("administrative_area_level_1")) {
        details.province = long_name;
      }
      if (types.includes("country")) {
        details.country = long_name;
      }
      if (types.includes("postal_code")) {
        details.postalCode = long_name;
      }
    });
    details.detailedAddress = result[0].formatted_address;
    if (!details.buildingNumber) {
      this.setState({
        isError: true,
        errorMessage: "No apartment number. Check if address is correct."
      });
      return;
    }
    if (details.country.toLowerCase() !== CANADA.toLowerCase()) {
      this.setState({
        isError: true,
        errorMessage: "Sorry, we do not serve in your area."
      });
      return;
    }
    details.name = addressValues.values.addressName;
    details.additionalDirections = addressValues.values.additionalDirections
      ? addressValues.values.additionalDirections
      : "";
    details.userID = this.props.user.ID;
    console.log(details);
    this.props.addUserAddress(details);
  }

  render() {
    return (
      <div>
        {this.state.isError && (
          <div className="error-class">{this.state.errorMessage}</div>
        )}
        <AddressForm
          processAddress={() =>
            this.processAddressFromData(this.props.formValues)
          }
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    formValues:
      state.form.userAddressForm && state.form.userAddressForm.value
        ? state.form.userAddressForm.values
        : state.form.userAddressForm,
    user: state.auth
  };
}
export default connect(mapStateToProps, actions)(AddressNew);
