import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createRestaurantMenuSection,
  getRestaurantMenuSectionList,
} from "../../../actions";
import AdminRestaurantMenuSectionForm from "./AdminRestaurantMenuSectionForm";
class AdminRestaurantMenuSectionNew extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (!this.props.selectedRestaurant?.ID) {
      this.props.history.goBack();
    }
    this.props.getRestaurantMenuSectionList(this.props.selectedRestaurant);
  }
  async createMenuSection() {
    console.log(this.props);
    const sectionData = {
      sectionName: this.props.newMenuSectionForm.sectionName,
      restaurantID: this.props.selectedRestaurant.ID,
    };
    this.props.createRestaurantMenuSection(sectionData);
  }

  renderSectionList() {
    if (this.props.restaurantMenuSections.length) {
      return this.props.restaurantMenuSections.map((section) => {
        return <div key={section.ID}>{section.sectionName}</div>;
      });
    }
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s6">
            <AdminRestaurantMenuSectionForm
              onNewMenuSection={() => this.createMenuSection()}
            />
          </div>
          <div className="col s6">{this.renderSectionList()}</div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { selectedRestaurant, restaurantMenuSections } = state;
  const formValues = state.form.adminRestaurantMenuSectionNew?.values;
  return {
    newMenuSectionForm: formValues ? formValues : "",
    selectedRestaurant,
    restaurantMenuSections,
  };
}
export default connect(mapStateToProps, {
  createRestaurantMenuSection,
  getRestaurantMenuSectionList,
})(AdminRestaurantMenuSectionNew);
