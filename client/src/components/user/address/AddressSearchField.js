import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import "../../../styles/main.scss";
class AddressSearchField extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      address: "",
      currentAddress: this.props.initialValue ? this.props.initialValue : ""
    };
  }

  handleChange = address => {
    this.setState({ address });
  };
  componentDidMount() {
    console.log(this.props);
  }
  handleSelect = address => {
    this.setState({ address });
    const { input } = this.props;
    const { onChange } = input;
    onChange(address);
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error));
  };
  showError = error => {
    console.log(error);
  };
  render() {
    const searchOptions = {
      types: ["address"]
    };
    // if (this.props.initialValue) {
    //   this.setState({ currentAddress: this.props.initialValue });
    // }
    return (
      <PlacesAutocomplete
        value={this.props.initialValue}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        onError={this.showError}
        searchOptions={searchOptions}
        debounce={500}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <label>Address</label>
            <input
              value={this.props.initialValue}
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input",
                name: "detailedAddress"
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                // console.log(suggestion);
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default AddressSearchField;
