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
    latitude: Number(props.information.latitude), // props.latitude
    longitude: Number(props.information.longitude), // props.longitude
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
      <CardText>{props.information.parkId}</CardText>
      <CardText>{props.information.checkInDate}</CardText>
      <CardText>{props.information.checkInTime + " - " + props.information.checkOutTime}</CardText>
      <CardText>{props.information.parkSlot}</CardText>
      <Button title={"delete"} onPress={() => {
        FirebaseProvider.userUnbook(
          props.information.parkId,
          props.information.checkInDate,
          props.information.checkInTime,
          props.information.checkOutTime,
          props.information.parkSlot,
          props.information.docId
        )
      }} />
    </Card>

  );
};

export default Tickets;