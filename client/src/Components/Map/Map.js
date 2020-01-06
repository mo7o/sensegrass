import React from "react";
import ReactMapGL, { Layer } from "react-map-gl";
import { observer } from "mobx-react";

const parkLayer = {
  id: "field",
  type: "line",
  source: {
    type: "geojson",
    data: {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: [
          [-91.91777365112385, 42.77959526112085],
          [-91.88172476196367, 42.78614663408926],
          [-91.88824789428806, 42.74808859751268],
          [-91.91966192627049, 42.76270968193681],
          [-91.91777365112385, 42.77959526112085]
        ]
      }
    }
  },
  layout: {
    "line-join": "round",
    "line-cap": "round"
  },
  paint: {
    "line-color": "#E2C233",
    "line-width": 4
  }
};

const TOKEN =
  "pk.eyJ1IjoibW9oaXRtb2pvIiwiYSI6ImNrNHhyN3BtczAyeTQzbmw1bmxzcmdpbnYifQ.mIcgJEcMJClq40PmDeF5NA"; // Set your mapbox token here

class Map extends React.Component {
  render() {
    // const { parkColor = "#dea" } = this.props;

    return (
      <ReactMapGL
        latitude={42.76}
        longitude={-91.874}
        zoom={12}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        height="100%"
        width="100%"
        mapboxApiAccessToken={TOKEN}
      >
        <Layer {...parkLayer} />
      </ReactMapGL>
    );
  }
}

export default observer(Map);
