import React, { Component } from "react";
import * as actions from "../../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ManageAddress extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
      user: {}
    };
  }
  async componentDidMount() {
    this._isMounted = true;
    console.log(this.props);
    if (!(this.props.user && this.props.user.ID)) {
      this.props.history.goBack();
    }
    await this.props.fetchUserAddresses(this.props.user.ID);
    if (this._isMounted) {
      this.setState({ addresses: this.props.addresses });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  editAddress = ID => {
    console.log(ID);
  };
  deleteAddress = ID => {
    console.log("delete", ID);
  };
  renderAddressList() {
    const addressCardStyle = {
      height: "130px"
    };
    if (
      this.props.user &&
      this.props.addresses &&
      this.props.addresses.length > 0
    ) {
      const { addresses } = this.props;
      return addresses.map(address => {
        return (
          <div key={address.ID} className="col s6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text" style={addressCardStyle}>
                <span className="card-title">{address.name}</span>
                <p>{address.detailedAddress}</p>
              </div>
              <div className="card-action">
                <a
                  onClick={() =>
                    this.props.history.push({
                      pathname: "/addressNew",
                      state: {
                        currentAddress: address
                      }
                    })
                  }
                >
                  <i className="material-icons">edit</i>
                </a>
                <a onClick={() => this.deleteAddress(address.ID)}>
                  <i className="material-icons">delete_forever</i>
                </a>
              </div>
            </div>
          </div>
        );
      });
    }
  }
  render() {
    return (
      <div className="container">
        <Link
          className="btn-floating btn-large waves-effect waves-light red"
          to="/addressNew"
        >
          <i className="material-icons">add</i>
        </Link>
        <div className="row">{this.renderAddressList()}</div>
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
