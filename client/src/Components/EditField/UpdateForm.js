import React, { Component } from "react";
import * as turf from "@turf/turf";
import { Mutation } from "react-apollo";

import { UPDATE_USER_LAND } from "../../queries";

import "./EditField.scss";

class UpdateForm extends Component {
  state = {
    _id: null,
    username: "",
    newPolygon: null,
    polygonArea: 0
  };

  componentDidMount() {
    console.log(this.props);
    const { newPolygon, _id, username } = this.props;
    if (newPolygon && _id && username) {
      this.setState({
        _id,
        username,
        newPolygon
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newPolygon) {
      this.setState({
        newPolygon: this.props.newPolygon
      });
    }
  }

  handleSubmit = (event, updateUserLand) => {
    event.preventDefault();
    updateUserLand().then(({ data }) => {
      console.log(data);
    });
  };

  render() {
    const { newPolygon, _id } = this.state;
    const polygon = newPolygon && turf.polygon(newPolygon);
    const polygonArea = polygon && turf.area(polygon) * 0.0001;
    console.log(polygonArea);

    if (this.state._id) {
      console.log(this.state);
    }

    return (
      <Mutation
        mutation={UPDATE_USER_LAND}
        // variables={{ lat, lng, polygonArea, username }}
        variables={{
          _id,
          polygonArea
        }}
      >
        {updateUserLand => {
          return (
            <div className="update-form">
              <h3>Update Field</h3>
              {newPolygon && (
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

export default UpdateForm;
