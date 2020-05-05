import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { setSelectedSection } from "../../../actions";
class AdminRestaurantMenuSectionForm extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (this.props.isEdit) {
      this.props.destroy();
      this.props.initialize(this.props.initialValues);
    }
  }
  componentWillUnmount() {
    if (this.props.isEdit) {
      this.props.destroy();
    }
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
            {!this.props.isEdit && <span>Save</span>}
            {this.props.isEdit && <span>Update</span>}
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
    keepDirtyOnReinitialize: false,
  };
}

AdminRestaurantMenuSectionForm = reduxForm({
  form: "adminRestaurantMenuSectionNew",
})(AdminRestaurantMenuSectionForm);

AdminRestaurantMenuSectionForm = connect(mapStateToProps, {
  setSelectedSection,
})(AdminRestaurantMenuSectionForm);
export default AdminRestaurantMenuSectionForm;
