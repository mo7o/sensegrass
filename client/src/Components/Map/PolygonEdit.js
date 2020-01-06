import React, { useState, useRef, useCallback } from "react";
import { LoadScript, GoogleMap, Polygon } from "@react-google-maps/api";

import "./Map.scss";

function PolygonEdit() {
  // Store Polygon path in state
  const [path, setPath] = useState([
    { lat: 52.529354757241045, lng: 13.39777521610256 },
    { lat: 52.52679620676139, lng: 13.322930855750997 },
    { lat: 52.50167198140832, lng: 13.323274178504903 },
    { lat: 52.49958199471234, lng: 13.40052179813381 }
  ]);

  // Define refs for Polygon instance and listeners
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);

  // Call setPath with new edited path
  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map(latLng => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      setPath(nextPath);
    }
  }, [setPath]);

  // Bind refs to current Polygon and listeners
  const onLoad = useCallback(
    polygon => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );

  // Clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach(lis => lis.remove());
    polygonRef.current = null;
  }, []);

  console.log("The path state is", path);

  return (
    <div style={{ height: "100%" }}>
      <LoadScript
        id="script-loader"
        googleMapsApiKey=""
        language="en"
        region="us"
      >
        <GoogleMap
          mapContainerClassName="App-map"
          center={{ lat: 52.52047739093263, lng: 13.36653284549709 }}
          zoom={12}
          version="weekly"
          on
        >
          <Polygon
            // Make the Polygon editable / draggable
            // editable
            // draggable
            path={path}
            // Event used when manipulating and adding points
            // onMouseUp={onEdit}
            // Event used when dragging the whole Polygon
            // onDragEnd={onEdit}
            onLoad={onLoad}
            onUnmount={onUnmount}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
