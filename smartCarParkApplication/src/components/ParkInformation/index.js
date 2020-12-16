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
      <View>
        <ParkNameText>{props.destinationInformation.parkAdi}</ParkNameText>
        <TypeDescription>{props.destinationInformation.address}</TypeDescription>
        <Stars rating={props.destinationInformation.rating} />
      </View>
      <RequestButton onPress={() => { props.bookPressed(props.destinationInformation) }}>
        <RequestButtonText>Book</RequestButtonText>
      </RequestButton>
    </Container>
  )
}

export default ParkInformation


