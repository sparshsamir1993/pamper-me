import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
// library.add(fab, faShoppingCart);

class Header extends Component {

    constructor(props){
        super(props);
        let { order } = window.localStorage.orderSession ? JSON.parse(window.localStorage.orderSession) : {};
        // console.log(order);
        this.state = {
            order,
            numberOfItems : ! _.isEmpty(order) ? order.orderItems.length : 0
        }
        console.log(this.state.numberOfItems);
    }
    com
    componentDidMount(){
        console.log(this.props);
    }
    renderContent(){

        console.log(this.props);

        switch(this.props.auth){
            case null:
                return;
            case false:
                return (
                    <li className=""><a href="/auth/google">Login with Google</a></li>
                );
            default:
                return [
                <li className="" key="2"><a href="/api/logout">Logout</a></li>
                ]
        }
    }
    checkIfAdmin(){
        if(this.props.auth.is_admin){
            return(
                <li key="admin"><Link to="/admin/restaurants">Admin Panel</Link></li>
            );
        }else{
            return "";
        }
    }
    checkIfCartPresnt(){
        
        if(window.localStorage.orderSession){
            // debugger;
            const {order} = JSON.parse(window.localStorage.orderSession);
            if(order){
                console.log("cart called");
                return (
                    <li key="cart">
                        <a className="ui label">
                            <FontAwesomeIcon icon={faShoppingCart}/>
                            &nbsp; {order.orderItems.length}
                        </a>
                    </li>
                );
            }
            else{
                return "";
            }
        }else{
            return "";
        }
    }
    render(){
        // console.log(this.props);
        return(
            <nav className="">
                <div className="nav-wrapper ">
                    <Link 
                        to={this.props.auth ? '/restaurants' : '/'} 
                        className="left brand-logo "
                    >
                        Platable
                    </Link>
                    <ul className="right ">
                        <li>
                            <a href="/restaurants">Restaurants</a>
                        </li>
                        {this.checkIfAdmin()}
                        {this.checkIfCartPresnt()}
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({auth, order}){
    let  orderStorage  = window.localStorage.orderSession ? JSON.parse(window.localStorage.orderSession).order : {};
    order = orderStorage;
    return {auth, order};
}
export default connect(mapStateToProps)(Header);
