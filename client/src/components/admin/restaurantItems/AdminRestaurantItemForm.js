import React, { Component } from "react";
import ReactDOM from "react-dom";
import { reduxForm, Field } from "redux-form";
import $ from "jquery";
import { connect } from "react-redux";
import AdminRestaurantField from "../restaurants/AdminRestaurantField";
import {
  loadInitailItemFormValues,
  getRestaurantMenuSectionList,
} from "../../../actions";
import * as constants from "../../../clientConstants";

class AdminRestaurantItemForm extends Component {
  componentDidMount() {
    this.props.getRestaurantMenuSectionList(this.props.selectedRestaurant);
  }
  render() {
    console.log(this.props);

    const itemTypes = this.props.restaurantMenuSections.map(
      (section) => section.sectionName
    );
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onNewItemSubmit)}>
          <Field
            key="name"
            type="text"
            label="Item Name"
            name="name"
            component={AdminRestaurantField}
          />
          <Field
            key="price"
            type="text"
            label="Item Price"
            name="price"
            component={AdminRestaurantField}
          />
          <Field key="itemType" name="itemType" component="select">
            <option></option>
            {itemTypes.map((type) => {
              return (
                <option value={type} key={type}>
                  {type}
                </option>
              );
            })}
          </Field>
          <button className="teal btn-flat right white-text" type="submit">
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { restaurantMenuSections, selectedRestaurant } = state;
  return {
    restaurantMenuSections,
    selectedRestaurant,
  };
}
AdminRestaurantItemForm = reduxForm({
  form: "adminRestaurantItemForm",
})(AdminRestaurantItemForm);

// AdminRestaurantItemForm = connect(
//     state =>({
//         initialValues: state,
//     }),{ load: loadInitailItemFormValues}
// )(AdminRestaurantItemForm);
AdminRestaurantItemForm = connect(mapStateToProps, {
  getRestaurantMenuSectionList,
})(AdminRestaurantItemForm);
export default AdminRestaurantItemForm;
