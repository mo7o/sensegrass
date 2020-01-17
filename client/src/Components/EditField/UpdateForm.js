import React, { Component } from "react";
import * as turf from "@turf/turf";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";

import { UPDATE_USER_LAND } from "../../queries";

import "./EditField.scss";

const initialState = {
  _id: null,
  username: "",
  polygonArea: 0,
  lat: null,
  lng: null
};

class UpdateForm extends Component {
  state = {
    ...initialState
  };

  componentDidMount() {
    const { coordinates, _id, username } = this.props;
    const polygon = coordinates && turf.polygon(coordinates);
    const polygonArea = polygon && turf.area(polygon) * 0.0001;
    const lng = [];
    const lat = [];

    if (coordinates) {
      this.getLng(coordinates[0], lng);
      this.getLat(coordinates[0], lat);
    }

    if (coordinates && _id && username) {
      this.setState({
        _id,
        username,
        polygonArea,
        lng,
        lat
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const coordinates = nextProps.coordinates;
    const polygon = coordinates && turf.polygon(coordinates);
    const polygonArea = polygon && turf.area(polygon) * 0.0001;
    const lng = [];
    const lat = [];

    if (coordinates) {
      this.getLng(coordinates[0], lng);
      this.getLat(coordinates[0], lat);
    }

    this.setState({
      polygonArea,
      lng,
      lat
    });
  }

  // get Longitudes
  getLng = (array, lng) => {
    for (let i = 0; i < array.length; i++) {
      lng.push(array[i][0]);
    }
    return lng;
  };

  // get Latitudes
  getLat = (array, lat) => {
    for (let i = 0; i < array.length; i++) {
      lat.push(array[i][1]);
    }
    return lat;
  };

  handleSubmit = (event, updateUserLand) => {
    event.preventDefault();

    updateUserLand().then(async ({ data }) => {
      console.log(data);
      await this.props.refetch();
      this.clearState();
      this.props.history.push("/");
    });
  };

  clearState = () => {
    this.setState({ ...initialState });
  };

  render() {
    const { lat, lng, _id, polygonArea, username } = this.state;

    return (
      <Mutation
        mutation={UPDATE_USER_LAND}
        variables={{
          lat,
          lng,
          _id,
          polygonArea,
          username
        }}
      >
        {updateUserLand => {
          return (
            <div className="update-form">
              <h3>Update Field</h3>
              {polygonArea && (
                <div>
                  <p>
                    <strong>
                      {polygonArea && polygonArea.toFixed(2)} Hectare
                    </strong>
                  </p>
                  <br />

                  <form
                    className="form"
                    onSubmit={event => this.handleSubmit(event, updateUserLand)}
                  >
                    <button className="button is-success" type="submit">
                      Submit
                    </button>
                  </form>
                </div>
              )}
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(UpdateForm);
