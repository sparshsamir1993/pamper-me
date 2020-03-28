import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UserProfile extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <ul className="collection with-header">
          <li className="collection-header">
            <h4>{this.props.auth.name}</h4>
          </li>
          <li className="collection-item">
            <div>
              Manage Address
              <Link to="/manageAddress" className="secondary-content">
                <i className="material-icons">send</i>
              </Link>
            </div>
          </li>
          <li className="collection-item">
            <div>
              Alvin
              <a href="#!" className="secondary-content">
                <i className="material-icons">send</i>
              </a>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { auth: state.auth };
}
export default connect(mapStateToProps)(UserProfile);
