import React, { Component } from "react";
import * as actions from "../../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ManageAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: []
    };
  }
  async componentDidMount() {
    await this.props.fetchUserAddresses();
    this.setState({ addresses: this.props.addresses });
  }
  render() {
    return (
      <div className="container">
        <Link
          class="btn-floating btn-large waves-effect waves-light red right"
          to="/addressNew"
        >
          <i class="material-icons">add</i>
        </Link>
        {!this.state.addresses.length && (
          <h4>You dont have any addresses saved</h4>
        )}
        {this.state.addresses.length > 0 && (
          <div className="row">
            <div className="col s3">Sparsh</div>
          </div>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    addresses: state.addresses
  };
}
export default connect(mapStateToProps, actions)(ManageAddress);
