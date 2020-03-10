import React, { Component } from "react";
import AdminRestaurantItemForm from "./AdminRestaurantItemForm";
import { connect } from "react-redux";
import * as actions from "../../../actions";
class AdminRestaurantItemsNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRestaurant: {}
    };
    // debugger;
    if (
      this.props.selectedRestaurant.name ||
      (this.props.location.state &&
        this.props.location.state.selectedRestaurant)
    ) {
      let selRes = this.props.selectedRestaurant;
      if (!selRes.name) {
        selRes = this.props.location.state.selectedRestaurant;
      }

      this.state = {
        ...this.state,
        selectedRestaurant: selRes
      };
    }
  }
  render() {
    console.log(this.props);
    console.log(this.state);
    if (
      !this.props.selectedRestaurant.name &&
      !this.state.selectedRestaurant.name
    ) {
      console.log("hellloooo");
      this.props.history.goBack();
    }
    if (this.props.location.state.item) {
      return (
        <div>
          <AdminRestaurantItemForm
            isEdit="true"
            initialValues={this.props.location.state.item}
            onNewItemSubmit={() =>
              this.props.editRestaurantItem(
                {
                  itemToUpdate: this.props.newitem,
                  selectedRestaurant: this.props.selectedRestaurant
                },
                this.props.history
              )
            }
          />
        </div>
      );
    }
    return (
      <div>
        <AdminRestaurantItemForm
          onNewItemSubmit={() =>
            this.props.createNewRestaurantItem(
              {
                newItem: this.props.newitem,
                selectedRestaurant: this.props.selectedRestaurant
              },
              this.props.history
            )
          }
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    newitem:
      state.form.adminRestaurantItemForm &&
      state.form.adminRestaurantItemForm.values,
    selectedRestaurant: state.selectedRestaurant
  };
}
export default connect(mapStateToProps, actions)(AdminRestaurantItemsNew);
