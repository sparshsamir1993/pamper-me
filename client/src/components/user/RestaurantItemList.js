import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import $ from "jquery";
import CartButtons from "./utilities/CartButton";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
const { APPETIZERS, DESSERT, MAIN_COURSE, SIDES } = require("../../gConstants");
const itemTypes = [APPETIZERS, MAIN_COURSE, SIDES, DESSERT];

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  //   console.log(props);
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function RenderTabPanels(value, componentThis) {
  console.log("value", value);
  return itemTypes.map((item, idx) => {
    return (
      <TabPanel value={value} index={idx}>
        {componentThis.renderList(item)}
      </TabPanel>
    );
  });
}

function RenderTabHeads() {
  return itemTypes.map((item, idx) => <Tab label={item} />);
}

function SimpleTabs(props) {
  console.log(props);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {RenderTabHeads()}
        </Tabs>
      </AppBar>
      {RenderTabPanels(value, props.componentThis)}
    </div>
  );
}
class RestaurantItemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRestaurant: this.props.match.params.restaurantId
    };
  }
  componentDidMount() {
    if (!this.props.match.params.restaurantId) {
      this.props.history.goBack();
    } else {
      console.log(this.props.match.params.restaurantId);
      const values = { selectedRestaurant: this.state.selectedRestaurant };
      this.props.fetchUserRestaurantsItems(values);
    }
  }

  renderList(itemType) {
    console.log(itemType);
    const orderItems = this.props.orderItems;
    if (this.props.restaurantItems && this.props.restaurantItems.length > 0) {
      return this.props.restaurantItems.map(item => {
        if (item.itemType == itemType) {
          return (
            <div className="item" key={item.ID}>
              <CartButtons
                orderValues={this.props.order}
                addToCartClick={this.props.addItemToOrder}
                currentItem={item}
              />
              <div className="content">
                <div className="header">{item.name}</div>
                <div className="description">${item.price}</div>
              </div>
            </div>
          );
        } else {
          return <div></div>;
        }
      });
    } else {
      return <div></div>;
    }
  }

  render() {
    return <SimpleTabs {...this.props} componentThis={this} />;
  }
}

function mapStateToProps(state) {
  // console.log(state);
  // debugger;
  let order = state.order.length ? state.order : null;
  order =
    !order && localStorage.getItem("orderSession")
      ? JSON.parse(localStorage.getItem("orderSession")).order
      : null;
  let orderItems = state.orderItems ? state.orderItems : null;
  orderItems =
    !orderItems.length && order && order.length ? order.orderItems : null;
  return {
    selectedRestaurant: state.selectedRestaurant,
    restaurantItems: state.restaurantItems,
    order: order,
    orderItems: orderItems,
    user: state.auth
  };
}
// const {fetchUserRestaurants} = actions;
export default connect(mapStateToProps, actions)(RestaurantItemList);
