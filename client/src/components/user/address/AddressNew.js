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
      errorMessage: "",
      currentAddress: "",
    };
  }

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.currentAddress) {
      let { currentAddress } = this.props.location.state;
      this.setState({ currentAddress });
    }
  }
  async processAddressFromData(addressValues) {
    console.log(addressValues);
    const result = await geocodeByAddress(addressValues.values.detailedAddress);
    console.log(result);
    const addressComponents = result[0].address_components;
    let details = {};

    addressComponents.map((component) => {
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
        errorMessage: "No apartment number. Check if address is correct.",
      });
      return;
    }
    if (details.country.toLowerCase() !== CANADA.toLowerCase()) {
      this.setState({
        isError: true,
        errorMessage: "Sorry, we do not serve in your area.",
      });
      return;
    }
    details.name = addressValues.values.name;
    details.additionalDirections = addressValues.values.additionalDirections
      ? addressValues.values.additionalDirections
      : "";
    details.userID = this.props.user.ID;
    details.addressID = addressValues.values.ID;
    console.log(details);
    return details;
    // this.saveAddress(details);
  }

  async saveAddress(addressValues) {
    // debugger;
    const details = await this.processAddressFromData(addressValues);
    await this.props.addUserAddress(details, this.props.history);
  }

  async editAddress(addressValues) {
    // debugger;
    let details = await this.processAddressFromData(addressValues);
    // details = { ...details, userID: this.props.user.ID };
    console.log(details);
    await this.props.editUserAddress(details, this.props.history);
  }
  renderForms() {
    if (this.state.currentAddress) {
      return (
        <AddressForm
          initialValues={this.state.currentAddress}
          processAddress={() => this.editAddress(this.props.formValues)}
        ></AddressForm>
      );
    } else {
      return (
        <AddressForm
          processAddress={() => this.saveAddress(this.props.formValues)}
        ></AddressForm>
      );
    }
  }
  render() {
    const iniVals = {};
    if (this.state.currentAddress) {
      console.log(this.state.currentAddress);
      const {
        name,
        detailedAddress,
        additionalDirections,
      } = this.state.currentAddress;
      iniVals.addressName = name;
      iniVals.autocompleteSearchAddress = detailedAddress;
      iniVals.additionalDirections = additionalDirections;
    }

    return <div>{this.renderForms()}</div>;
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    formValues:
      state.form.userAddressForm && state.form.userAddressForm.value
        ? state.form.userAddressForm.values
        : state.form.userAddressForm,
    user: state.auth,
  };
}
export default connect(mapStateToProps, actions)(AddressNew);
