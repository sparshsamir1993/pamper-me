import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import AdminRestaurantForm from "./AdminRestaurantForm";
// import validateEmails from "../../util/validateEmails";
// import SurveyFormReview from "./SurveyFormReview";
// import formFields from "./formFields";

class AdminRestaurantNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRestaurant: {}
    };
  }
  componentDidMount() {
    if (
      this.props.location.state &&
      this.props.location.state.selectedRestaurant
    ) {
      let selRes = this.props.location.state.selectedRestaurant;
      this.setState({ selectedRestaurant: selRes });
    }
  }
  renderContent() {
    // console.log(this.props);
    if (this.state.selectedRestaurant.name) {
      // console.log("\n\n\n\n\n name is  :::::"+ this.state.selectedRestaurant.name);
      return (
        <AdminRestaurantForm
          initialValues={this.state.selectedRestaurant}
          onNewSubmit={() =>
            this.props.editRestaurant(
              this.props.formValues.values,
              this.props.history
            )
          }
        />
      );
    } else {
      return (
        <AdminRestaurantForm
          onNewSubmit={() =>
            this.props.createNewRestaurant(
              this.props.formValues.values,
              this.props.history
            )
          }
        />
      );
    }
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

function mapStateToProps(state) {
  // console.log(state);
  return {
    formValues:
      state.form.adminRestaurantNewForm &&
      state.form.adminRestaurantNewForm.value
        ? state.form.adminRestaurantNewForm.value
        : state.form.adminRestaurantNewForm
  };
}

export default connect(mapStateToProps, actions)(AdminRestaurantNew);
