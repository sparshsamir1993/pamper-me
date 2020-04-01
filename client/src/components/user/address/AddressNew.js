import React, { Component } from "react";
import AddressForm from "./AddressForm";
import { connect } from "react-redux";
import { geocodeByAddress } from "react-places-autocomplete";

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
    details.name = addressValues.values.addressName;
    console.log(details);
    // this.props.addUserAddress();
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
  return {
    formValues:
      state.form.userAddressForm && state.form.userAddressForm.value
        ? state.form.userAddressForm.value
        : state.form.userAddressForm
  };
}
export default connect(mapStateToProps)(AddressNew);
