import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
class AdminRestaurantMenuSectionForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onNewMenuSection)}>
          <label htmlFor="sectionName">Menu Section Name</label>
          <Field
            key="sectionName"
            type="text"
            label="Section Name"
            name="sectionName"
            component="input"
          />
          <button
            className="btn-flat right white-text submit-button"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    initialValues: state.selectedSection,
    enableReinitialize: true,
  };
}

AdminRestaurantMenuSectionForm = reduxForm({
  form: "adminRestaurantMenuSectionNew",
})(AdminRestaurantMenuSectionForm);

AdminRestaurantMenuSectionForm = connect(mapStateToProps)(
  AdminRestaurantMenuSectionForm
);
export default AdminRestaurantMenuSectionForm;
