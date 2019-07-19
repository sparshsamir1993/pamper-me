import React, { Component } from 'react';
import { reduxForm, Field } from "redux-form";
import AdminRestaurantField from "../restaurants/AdminRestaurantField";

class AdminRestaurantItemForm extends Component{
    render(){
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onNewItemSubmit)}>
                    <Field key="name" type="text" label="Item Name" name="name" component={AdminRestaurantField}/>
                    <Field key="price" type="text" label="Item Price" name="price" component={AdminRestaurantField}/>
                    <Field key="type" name="type" component="select">
                        <option></option>
                        <option>Salads</option>
                        <option>Starters</option>
                        <option>Main Course</option>
                        <option>Dessert</option>
                    </Field>
                    <button className="teal btn-flat right white-text" type="submit">
                        <i className="material-icons right">done</i>
                    </button>
                </form>
                
            </div>
        );
    }
}
export default reduxForm({
    form: "adminRestaurantItemForm"
})(AdminRestaurantItemForm);