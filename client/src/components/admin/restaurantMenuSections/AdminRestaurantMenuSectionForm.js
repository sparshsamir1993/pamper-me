import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
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

export default reduxForm({ form: "adminRestaurantMenuSectionNew" })(
  AdminRestaurantMenuSectionForm
);
