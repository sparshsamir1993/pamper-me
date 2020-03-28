import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import M from "materialize-css";

class Header extends Component {
  constructor(props) {
    super(props);
    let { order } = window.localStorage.orderSession
      ? JSON.parse(window.localStorage.orderSession)
      : {};
    // console.log(order);
    this.state = {
      order,
      numberOfItems: !_.isEmpty(order) ? order.OrderItems.length : 0
    };
    console.log(this.state.numberOfItems);
  }
  componentDidMount() {
    // const $ = require("jquery");
    console.log(this.props);
  }

  initProfileDropdown() {
    M.AutoInit();
    let dropdowns = document.querySelectorAll(".dropdown-trigger");
    let options = {
      inDuration: 300,
      outDuration: 225,
      hover: true,
      belowOrigin: true
    };
    M.Dropdown.init(dropdowns, options);
  }

  renderContent() {
    console.log(this.props);

    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li className="">
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        return (
          <li className="" key="2">
            {/* <a href="/api/logout">Logout</a> */}
            <a
              className="dropdown-trigger"
              id="dropdownButton"
              href="#!"
              data-target="user-dropdown"
            >
              Dropdown<i className="material-icons right">arrow_drop_down</i>
            </a>
          </li>
        );
    }
  }
  checkIfAdmin() {
    if (this.props.auth.is_admin) {
      return (
        <li key="admin">
          <Link to="/admin/restaurants">Admin Panel</Link>
        </li>
      );
    } else {
      return "";
    }
  }
  checkIfCartPresnt() {
    if (window.localStorage.orderSession) {
      // debugger;
      const { order } = JSON.parse(window.localStorage.orderSession);
      if (order) {
        console.log("cart called");
        return (
          <li key="cart">
            <Link to="/cart" className="ui label">
              <FontAwesomeIcon icon={faShoppingCart} />
              &nbsp; {order.OrderItems.length}
            </Link>
          </li>
        );
      } else {
        return "";
      }
    } else {
      return "";
    }
  }
  render() {
    return (
      <div>
        <nav className="">
          <div className="nav-wrapper ">
            <Link
              to={this.props.auth ? "/restaurants" : "/"}
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
              {this.props.auth && this.props.auth.ID && (
                <li className="" key="2">
                  <a
                    className="dropdown-trigger"
                    href="#!"
                    data-target="user-dropdown"
                    onMouseEnter={this.initProfileDropdown}
                  >
                    Dropdown
                    <i className="material-icons right">arrow_drop_down</i>
                  </a>
                  <ul id="user-dropdown" className="dropdown-content">
                    <li key="1" tabIndex="-1">
                      Profile
                    </li>
                    <li className="" key="2">
                      <a href="/api/logout">Logout</a>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps({ auth, order }) {
  // debugger;
  let orderStorage = window.localStorage.orderSession
    ? JSON.parse(window.localStorage.orderSession).order
    : {};
  order = orderStorage;
  // debugger;
  // auth = Object.keys(auth).length == 0 ? false: true;

  return { auth, order };
}
export default connect(mapStateToProps)(Header);
