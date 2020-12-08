import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { FirebaseContext } from '../../provider/FirebaseProvider'
import { Button } from 'react-native'

import {
  Card,
  CardText,
  DateTimeCard,
  DateTimeText,
  CardHeader
} from './style'

import {
  View
} from 'react-native'

const Ticket = (props) => {

  const FirebaseProvider = useContext(FirebaseContext);
  const region = {
    latitude: Number(props.information.latitude), // props.latitude
    longitude: Number(props.information.longitude), // props.longitude
    latitudeDelta: 0.00550,
    longitudeDelta: 0.00550,
  }
  return (
    <Card onPress={() => {
      props.navigation.navigate("TicketDetails", {
        parkId: props.information.parkId,
        checkInDate: props.information.checkInDate,
        checkInTime: props.information.checkInTime,
        checkOutTime: props.information.checkOutTime,
        latitude: region.latitude,
        longitude: region.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
        parkSlot: props.information.parkSlot,
        docId: props.information.docId
      })
    }}>
      <CardHeader>
        <CardText>{props.information.parkId}</CardText>
        <Icon name="arrow-forward-ios" size={25} color="#292929" />
      </CardHeader>
      <DateTimeCard>
        <View>
          <DateTimeText>Date</DateTimeText>
          <CardText>{props.information.checkInDate}</CardText>
        </View>
        <View>
          <DateTimeText>Time</DateTimeText>
          <CardText>{props.information.checkInTime + " - " + props.information.checkOutTime}</CardText>
        </View>
      </DateTimeCard>
    </Card>

  );
};

export default Ticket;