
import React from "react";
import MapViewDirections from "react-native-maps-directions";

const Directions = ({ destination, origin, onReady }) => (
  <MapViewDirections
    destination={destination}
    origin={origin}
    onReady={onReady}
    apikey="AIzaSyAbE_uxNFwH3bHysGhNhWVhrGTHpsDHpxc"
    strokeWidth={3}
    strokeColor="red"
  />
);


export default Directions