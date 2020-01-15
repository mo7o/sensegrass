import React, { Component } from "react";
import area from "@turf/area";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";

import { ADD_LAND } from "../../queries";

import "./EditField.scss";

const defaultContainer = ({ children }) => (
  <div className="control-panel">{children}</div>
);

const initialState = {
  username: "",
  lng: null,
  lat: null,
  polygonArea: 0
};

class ControlPanel extends Component {
  state = {
    ...initialState
  };

  componentDidMount() {
    const username = this.props.session.getCurrentUser.username;

    this.setState({
      username
    });
  }

  componentWillReceiveProps(nextProps) {
    const polygon = nextProps.polygon;
    const coordinates = polygon && polygon.geometry.coordinates;
    const polygonArea = polygon && area(polygon) * 0.0001;
    const lng = [];
    const lat = [];

    console.log(coordinates);

    if (coordinates) {
      this.getLng(coordinates[0], lng);
      this.getLat(coordinates[0], lat);
    }

    this.setState({
      lng,
      lat,
      polygonArea
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

  clearState = () => {
    this.setState({ ...initialState });
  };

  handleSubmit = (event, addLand) => {
    event.preventDefault();

    addLand().then(async ({ data }) => {
      console.log(data);
      await this.props.refetch();
      this.clearState();
      this.props.history.push("/");
    });
  };

  render() {
    const Container = this.props.containerComponent || defaultContainer;
    const { polygon } = this.props;
    const { polygonArea, lat, lng, username } = this.state;

    return (
      <Mutation
        mutation={ADD_LAND}
        variables={{ lat, lng, polygonArea, username }}
      >
        {(addLand, { data, loading, error }) => {
          return (
            <Container>
              <h3>Draw Polygon</h3>
              {polygon && (
                <div>
                  <p>
                    <strong>
                      {polygonArea && polygonArea.toFixed(2)} Hectare
                    </strong>
                  </p>
                  <br />

                  <form
                    className="form"
                    onSubmit={event => this.handleSubmit(event, addLand)}
                  >
                    <button className="button is-success" type="submit">
                      Submit
                    </button>
                  </form>
                </div>
              )}
              {error && <p error={error}></p>}
            </Container>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(ControlPanel);
