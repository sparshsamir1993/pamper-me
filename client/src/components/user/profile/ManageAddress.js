import React, { Component } from "react";
import * as actions from "../../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ManageAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
      user: {}
    };
  }
  async componentDidMount() {
    console.log(this.props);
    if (!(this.props.user && this.props.user.ID)) {
      this.props.history.goBack();
    }
    await this.props.fetchUserAddresses(this.props.user.ID);
    this.setState({ addresses: this.props.addresses });
  }
  renderAddressList() {
    if (
      this.props.user &&
      this.props.addresses &&
      this.props.addresses.length > 0
    ) {
      return <div> hohohohohohoho</div>;
    }
  }
  render() {
    return (
      <div className="container">
        <Link
          className="btn-floating btn-large waves-effect waves-light red right"
          to="/addressNew"
        >
          <i className="material-icons">add</i>
        </Link>
        {this.renderAddressList()}
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log(state);
  return {
    addresses: state.addresses,
    user: state.auth
  };
}

export default connect(mapStateToProps, actions)(ManageAddress);
