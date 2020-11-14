import React, { useContext } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { FirebaseContext } from '../../provider/FirebaseProvider'
import { Button } from 'react-native'

import {
  Card,
  CardText
} from './style'

const Tickets = (props) => {
  const FirebaseProvider = useContext(FirebaseContext);
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
      <CardText>{props.parkId}</CardText>
      <CardText>{props.checkInDate}</CardText>
      <CardText>{props.checkInTime + " - " + props.checkOutTime}</CardText>
      <CardText>{props.parkSlotName}</CardText>
      <Button title={"delete"} onPress={() => {
        FirebaseProvider.userUnbook(props.parkId, props.checkInDate, props.checkInTime, props.checkOutTime)
      }} />
    </Card>

  );
};

export default Tickets;