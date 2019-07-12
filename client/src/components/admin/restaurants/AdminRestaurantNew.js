import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import _ from "lodash";
import { connect } from "react-redux";
import * as actions from "../../../actions"
import AdminRestaurantForm from "./AdminRestaurantForm";
// import validateEmails from "../../util/validateEmails";
// import SurveyFormReview from "./SurveyFormReview";
// import formFields from "./formFields";

class AdminRestaurantNew extends Component{

    renderContent(){
        // console.log(this.props);
        return(
            <AdminRestaurantForm onNewSubmit={()=>this.props.createNewRestaurant(this.props.formValues.values, this.props.history)} />
        );
    }

    render(){
        return(
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps(state){
    // console.log(state);
    return {
        formValues: state.form.adminRestaurantNewForm && state.form.adminRestaurantNewForm.value ? state.form.adminRestaurantNewForm.value : state.form.adminRestaurantNewForm 
    }
}

export default connect(mapStateToProps, actions)(AdminRestaurantNew);