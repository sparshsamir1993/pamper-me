import React, {Component} from "react";
import AdminRestaurantItemForm from "./AdminRestaurantItemForm";
import { connect } from "react-redux";
import * as actions from "../../../actions"
class AdminRestaurantItemsNew  extends Component{
    render(){
        console.log(this.props);
        if(!this.props.selectedRestaurant.name){
            this.props.history.goBack();
        }
        if(this.props.location.state.item){
            return(
                <div>
                    <AdminRestaurantItemForm onNewItemSubmit={()=>this.props.editRestaurantItem({
                                                                                newItem: this.props.newitem, 
                                                                                selectedRestaurant: this.props.selectedRestaurant
                                                                            }, this.props.history)}/>
                </div>  
            );
        }
        return(
            <div>
                <AdminRestaurantItemForm onNewItemSubmit={()=>this.props.createNewRestaurantItem({
                                                                            newItem: this.props.newitem, 
                                                                            selectedRestaurant: this.props.selectedRestaurant
                                                                        }, this.props.history)}/>
            </div>  
        );
    }
}

function mapStateToProps(state){
    // console.log(state);
    return{
        newitem: state.form.adminRestaurantItemForm && state.form.adminRestaurantItemForm.values,
        selectedRestaurant: state.selectedRestaurant
    };
}
export default connect(mapStateToProps, actions)(AdminRestaurantItemsNew);

