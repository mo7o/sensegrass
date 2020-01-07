import React, { Component } from "react";
import area from "@turf/area";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import { Mutation } from "react-apollo";

import { ADD_LAND } from "../../queries";

import "./SelectField.scss";

const defaultContainer = ({ children }) => (
  <div className="control-panel">{children}</div>
);

class ControlPanel extends Component {
  state = {
    username: "",
    lat: null,
    lng: null,
    polygonArea: 0
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
    const lat = [];
    const lng = [];

    if (coordinates) {
      this.getLat(coordinates[0], lat);
      this.getLng(coordinates[0], lng);
    }

    this.setState({
      lat,
      lng,
      polygonArea
    });
  }

  // get Latitudes
  getLat = (array, lat) => {
    for (let i = 0; i < array.length; i++) {
      lat.push(array[i][0]);
    }
    return lat;
  };

  // get Longitudes
  getLng = (array, lng) => {
    for (let i = 0; i < array.length; i++) {
      lng.push(array[i][1]);
    }
    return lng;
  };

  handleSubmit = (event, addLand) => {
    event.preventDefault();

    addLand().then(({ data }) => {
      console.log(data);
    });

    // this.props.history.push("/");
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
                  {/* <Link to="/" exact> */}
                  <form
                    className="form"
                    onSubmit={event => this.handleSubmit(event, addLand)}
                  >
                    <button className="button is-success" type="submit">
                      Submit
                    </button>
                  </form>
                  {/* </Link> */}
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

export default inject("mapStore")(observer(ControlPanel));
