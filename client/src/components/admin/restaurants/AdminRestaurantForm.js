import React, { Component } from 'react';
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import _ from "lodash";
import AdminRestaurantField from "./AdminRestaurantField";

class AdminRestaurantForm extends Component{
    render(){
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onNewSubmit)}>
                    <Field key="name" type="text" label="Restaurant Name" name="name" component={AdminRestaurantField}/>
                    <Field key="contact" type="text" label="Restaurant Contact" name="contact" component={AdminRestaurantField}/>
                    <button className="teal btn-flat right white-text" type="submit">
                        <i className="material-icons right">done</i>
                    </button>
                </form>
                
            </div>
        );
    }
}
export default reduxForm({
    form: "adminRestaurantNewForm"
})(AdminRestaurantForm);