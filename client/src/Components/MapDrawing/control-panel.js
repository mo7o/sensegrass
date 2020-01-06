import React, { Component } from "react";
import area from "@turf/area";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";

import "./MapDrawing.scss";

const defaultContainer = ({ children }) => (
  <div className="control-panel">{children}</div>
);

class ControlPanel extends Component {
  onPolygonSubmit = polygonCoordinates => {
    this.props.mapStore.setCoordinates(polygonCoordinates);
    this.props.history.push("/");
  };

  render() {
    const Container = this.props.containerComponent || defaultContainer;
    const polygon = this.props.polygon;
    const polygonCoordinates = polygon && polygon.geometry.coordinates;
    const polygonArea = polygon && area(polygon) * 0.0001;

    return (
      <Container>
        <h3>Draw Polygon</h3>
        {polygon && (
          <div>
            <p>
              <strong>{polygonArea && polygonArea.toFixed(2)} Hectare</strong>
            </p>
            <br />
            <Link to="/" exact>
              <button
                className="button is-success"
                onClick={this.props.mapStore.setCoordinates(polygonCoordinates)}
              >
                Submit
              </button>
            </Link>
          </div>
        )}
      </Container>
    );
  }
}
 
export default inject("mapStore")(observer(ControlPanel));
