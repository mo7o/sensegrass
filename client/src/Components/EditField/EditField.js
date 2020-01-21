//   /*
//  const coordinates = [
//       [77.09115310270072, 28.863025246358706],
//       [77.09372342531724, 28.863036592572175],
//       [77.0936741064949, 28.861384486530607],
//       [77.09113879758684, 28.86142319034171],
//       [77.09115310270072, 28.863025246358706]
//     ];
//   */

import React from "react";
import DeckGL from "@deck.gl/react";
import { EditableGeoJsonLayer, ModifyMode } from "nebula.gl";
import { StaticMap } from "react-map-gl";

import { GET_USER_LAND } from "../../queries";
import { Query } from "react-apollo";
import UpdateForm from "./UpdateForm";

import "./EditField.scss";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibW9oaXRtb2pvIiwiYSI6ImNrNHhyN3BtczAyeTQzbmw1bmxzcmdpbnYifQ.mIcgJEcMJClq40PmDeF5NA";

const selectedFeatureIndexes = [0];

class EditField extends React.Component {
  state = {
    _id: null,
    data: null,
    username: ""
  };

  componentDidMount() {
    const username = this.props.session.getCurrentUser.username;

    this.setState({
      username
    });
  }

  // combine lat and lng in coordinate
  combineCoord = (lat, lng, coordinates) => {
    for (let i = 0; i < lat.length; i++) {
      coordinates.push([lng[i], lat[i]]);
    }
    return coordinates;
  };

  // get data from backend and set to state
  loadCoordinates = coordinates => {
    const userPolygon = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [coordinates]
          }
        }
      ]
    };

    this.setState({
      data: userPolygon
    });
  };

  loadField = data => {
    this.setState({
      _id: data._id
    });
  };

  renderUpdateForm = () => {
    const coordinates = this.state.data.features[0].geometry.coordinates;
    const { data, _id, username } = this.state;

    if (data && _id && username) {
      return (
        <UpdateForm
          coordinates={coordinates}
          _id={_id}
          username={username}
          refetch={this.props.refetch}
        />
      );
    }
  };

  render() {
    const { username } = this.state;

    return (
      <Query query={GET_USER_LAND} variables={{ username }}>
        {({ data, loading, error }) => {
          const lat = data && data.getUserLand.lat;
          const lng = data && data.getUserLand.lng;

          const latitude = lat && lat[0];
          const longitude = lng && lng[lng.length - 1];
          const coordinates = [];

          if (data && this.state._id == null) {
            this.loadField(data.getUserLand);
          }

          if (data && this.state.data == null) {
            this.loadCoordinates(coordinates);
          }

          console.log(this.state);

          const initialViewState = {
            longitude,
            latitude,
            zoom: 14
          };

          if (lat) {
            this.combineCoord(lat, lng, coordinates);
          }

          if (loading) {
            return (
              <div
                style={{
                  backgroundColor: "#FFF",
                  height: "100vh",
                  padding: "15% 40%"
                }}
              >
                <img src={require("../../assets/images/spinner.gif")} alt="" />
              </div>
            );
          }
          if (error) return <div>Error</div>;

          // set polygon data from recieved user data

          const layer = new EditableGeoJsonLayer({
            id: "geojson-layer",
            data: this.state.data,
            mode: ModifyMode,
            selectedFeatureIndexes,

            onEdit: ({ updatedData }) => {
              this.setState({
                data: updatedData
              });
            }
          });

          if (this.state.data)
            console.log(this.state.data.features[0].geometry.coordinates);

          return (
            <div className="columns">
              <div className="column is-four-fifths">
                <DeckGL
                  initialViewState={initialViewState}
                  controller={{
                    doubleClickZoom: false
                  }}
                  layers={[layer]}
                >
                  <StaticMap
                    mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
                    mapStyle="mapbox://styles/mapbox/satellite-v9"
                  />
                </DeckGL>
              </div>
              <div className="column">
                {this.state.data ? this.renderUpdateForm() : null}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default EditField;
