import React from "react";
import ReactMapGL, { Layer } from "react-map-gl";

import { GET_USER_LAND } from "../../queries";
import { Query } from "react-apollo";

const userPolygon = {
  id: "field",
  type: "line",
  layout: {
    "line-join": "round",
    "line-cap": "round"
  },
  source: {
    type: "geojson",
    data: {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: null
      }
    }
  },
  paint: {
    "line-color": "#E2C233",
    "line-width": 4
  },
  viewport: {
    longitude: -91.874,
    latitude: 42.76,
    zoom: 12
  }
};

const TOKEN =
  "pk.eyJ1IjoibW9oaXRtb2pvIiwiYSI6ImNrNHhyN3BtczAyeTQzbmw1bmxzcmdpbnYifQ.mIcgJEcMJClq40PmDeF5NA";

class Map extends React.Component {
  state = {
    ...userPolygon
  };

  // combine lat and lng in coordinate
  combineCoord = (lat, lng, coordinates) => {
    for (let i = 0; i < lat.length; i++) {
      coordinates.push([lng[i], lat[i]]);
    }
    return coordinates;
  };

  render() {
    const { username } = this.props;

    return (
      <Query query={GET_USER_LAND} variables={{ username }}>
        {({ data, loading, error }) => {
          const lat = data && data.getUserLand.lat;
          const lng = data && data.getUserLand.lng;

          const latitude = lat && lat[0];
          const longitude = lng && lng[lng.length - 1];
          const coordinates = [];

          const source = {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates
              }
            }
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
                  padding: "35% 40%"
                }}
              >
                <img src={require("../../assets/images/spinner.gif")} alt="" />
              </div>
            );
          }
          if (error) return <div>Error</div>;

          return (
            <ReactMapGL
              latitude={latitude}
              longitude={longitude}
              zoom={14}
              mapStyle="mapbox://styles/mapbox/satellite-v9"
              height="100%"
              width="100%"
              mapboxApiAccessToken={TOKEN}
              // {...this.state.viewport}
              // onViewportChange={viewport => {
              //   const { width, height, latitude, longitude, zoom } = viewport;
              // }}
            >
              <Layer {...userPolygon} source={source} />
            </ReactMapGL>
          );
        }}
      </Query>
    );
  }
}

export default Map;
