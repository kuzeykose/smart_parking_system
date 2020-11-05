import React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { View } from 'react-native'
import {
  Card,
  CardText
} from './style'

const Tickets = (props) => {
  const region = {
    latitude: Number(props.latitude), // props.latitude
    longitude: Number(props.longitude), // props.longitude
    latitudeDelta: 0.00550,
    longitudeDelta: 0.00550,
  }
  return (
    <Card>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={region}
        rotateEnabled={false}
        scrollEnabled={false}
      >
        <Marker
          coordinate={region}
          anchor={{ x: 0, y: 0 }} >
        </Marker>
      </MapView>
      <CardText>{props.parkName}</CardText>
      <CardText>{props.date}</CardText>
      <CardText>{props.time}</CardText>
      <CardText>{props.parkSlotName}</CardText>
    </Card>

  );
};

export default Tickets;

//<LocationBox>
//  <LocationText>Bilgi Uni</LocationText>
//</LocationBox> 