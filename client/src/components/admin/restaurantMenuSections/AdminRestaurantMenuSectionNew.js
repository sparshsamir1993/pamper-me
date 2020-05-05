import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createRestaurantMenuSection,
  getRestaurantMenuSectionList,
  deleteMenuSection,
  setSelectedSection,
} from "../../../actions";
import AdminRestaurantMenuSectionForm from "./AdminRestaurantMenuSectionForm";
class AdminRestaurantMenuSectionNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      selectedSection: undefined,
    };
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

  editMenuSection(section) {
    this.setState({ selectedSection: section });
    this.setState({ isEdit: true });
    this.props.setSelectedSection(section);
  }

  renderSectionList() {
    if (this.props.restaurantMenuSections.length) {
      return this.props.restaurantMenuSections.map((section) => {
        return (
          <li className="collection-item" key={section.ID}>
            <div>
              {section.sectionName}
              <div className="secondary-content" style={{ display: "flex" }}>
                <a
                  className="btn btn-block"
                  onClick={() => this.editMenuSection(section)}
                >
                  <i className=" material-icons">edit</i>
                </a>
                <a
                  className="btn btn-block"
                  onClick={() => this.props.deleteMenuSection(section.ID)}
                >
                  <i className="material-icons">delete</i>
                </a>
              </div>
            </div>
          </li>
        );
      });
    }
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s6">
            {this.state.isEdit && (
              <AdminRestaurantMenuSectionForm
                initialValues={this.state.selectedSection}
                onNewMenuSection={() => this.updateMenuSection()}
              />
            )}
            {!this.state.isEdit && (
              <AdminRestaurantMenuSectionForm
                onNewMenuSection={() => this.createMenuSection()}
              />
            )}
          </div>
          <div className="col s6">
            <ul className="collection with-header">
              <li className="collection-header">
                <h5>Menu Sections for {this.props.selectedRestaurant.name}</h5>
              </li>
              {this.renderSectionList()}
            </ul>
          </div>
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
  deleteMenuSection,
  setSelectedSection,
})(AdminRestaurantMenuSectionNew);
