import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
    componentDidMount(){}
    renderContent(){
        // console.log(this.props.auth);
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
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({auth}){
    return {auth};
}
export default connect(mapStateToProps)(Header);