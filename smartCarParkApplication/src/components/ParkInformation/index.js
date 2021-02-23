import React, { useContext } from 'react'
import Stars from '../Stars'

import {
  RequestButton,
  RequestButtonText,
  ParkNameText,
  Container,
  TypeDescription
} from './style'

import { View } from 'react-native';

const ParkInformation = (props) => {
  return (
    <Container>
      <View style={{ marginTop: 45, marginLeft: 20 }}>
        <ParkNameText>{props.destinationInformation.parkName}</ParkNameText>
        <TypeDescription>{props.destinationInformation.address}</TypeDescription>
        <Stars rating={props.destinationInformation.rating} />
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <RequestButton onPress={() => { props.bookPressed(props.destinationInformation) }}>
          <RequestButtonText>Book</RequestButtonText>
        </RequestButton>
      </View>
    </Container >
  )
}

export default ParkInformation


