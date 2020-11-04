import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import {
  Card,
  CardText,
} from './style'

const Tickets = (props) => {
  return (
    <Card>
      {/* <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: parseFloat(props.latitude), // props.latitude
          longitude: parseFloat(props.longitude), // props.longitude
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      /> */}
      <CardText>{props.parkName}</CardText>
      <CardText>{props.date}</CardText>
      <CardText>{props.time}</CardText>
      <CardText>{props.parkSlotName}</CardText>
    </Card>
  );
};

export default Tickets;
