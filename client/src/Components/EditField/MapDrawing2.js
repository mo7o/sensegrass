import React from "react";
import { LoadScript, GoogleMap, DrawingManager } from "@react-google-maps/api";
import { Link } from "react-router-dom";

// import "./MapDrawing.scss";

function MapDrawing() {
  const onLoad = drawingManager => {
    console.log(drawingManager);
  };

  const onPolygonComplete = polygon => {
    console.log(polygon);
  };
 
  return (
    <div className="main" style={{ backgroundColor: "#EEEEEE" }}>
      <div className="map-drawing" style={{ height: "70%" }}>
        <div style={{ height: "100%" }}>
          <LoadScript
            id="script-loader"
            googleMapsApiKey=""
            language="en"
            region="us"
            libraries={["drawing"]}
          >
            <GoogleMap
              mapContainerClassName="drawing-map"
              center={{ lat: 52.52047739093263, lng: 13.36653284549709 }}
              zoom={12}
            >
              <DrawingManager
                onLoad={onLoad}
                onPolygonComplete={onPolygonComplete}
                drawingMode="polygon"
                drawingControl="false"
              />
            </GoogleMap>
          </LoadScript>
        </div>
        <br /> <br />
        <div className="has-text-centered">
          <Link to="/" exact>
            <button type="submit" className="button  is-success is-rounded">
              Submit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MapDrawing;
