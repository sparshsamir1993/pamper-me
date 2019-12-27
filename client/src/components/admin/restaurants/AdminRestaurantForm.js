import React, { Component } from 'react';
import { reduxForm, Field } from "redux-form";
import AdminRestaurantField from "./AdminRestaurantField";

class AdminRestaurantForm extends Component{
    
    render(){
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onNewSubmit)}>
                    <Field key="name" type="text" label="Restaurant Name" name="name" component={AdminRestaurantField}/>
                    <Field key="contact" type="text" label="Restaurant Contact" name="phone" component={AdminRestaurantField}/>
                    <Field key="address" type="text" label="Restaurant Address(optional)" name="address" component={AdminRestaurantField}/>
                    <Field key="lat" type="text" label="Restaurant Latitude(optional)" name="lat" component={AdminRestaurantField}/>
                    <Field key="lng" type="text" label="Restaurant Longitude(optional)" name="lng" component={AdminRestaurantField}/>
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