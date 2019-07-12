import React, { Component } from  'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route} from 'react-router-dom';
import AdminRestaurantList from "./admin/restaurants/AdminRestaurantList";
import AdminRestaurantNew from "./admin/restaurants/AdminRestaurantNew";
import AdminRestaurantItemList  from "./admin/restaurantItems/AdminRestaurantItemsList";
import AdminRestaurantItemNew  from "./admin/restaurantItems/AdminRestaurantItemsNew";
class App extends Component{
    render(){
        return(
            <div>
                <BrowserRouter>
                    <div>
                        <div className="container">
                            <Route exact path="/" />
                            <Route exact path="/admin/restaurants" component={AdminRestaurantList}/>
                            <Route exact path="/admin/restaurants/new" component={AdminRestaurantNew}/>
                            <Route exact path="/admin/restaurants/items" component={AdminRestaurantItemList}/>
                            <Route exact path="/admin/restaurants/items/new" component={AdminRestaurantItemNew}/>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );

    }
}
export default App;