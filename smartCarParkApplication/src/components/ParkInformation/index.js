import React, { useContext } from 'react'

import {
  RequestButton,
  RequestButtonText,
  ParkNameText,
  Container,
  TypeDescription
} from './style'

import { View } from 'react-native';

const DetailsIOS = (props) => {
  return (
    <Container>
      <View>
        <ParkNameText>{props.destinationInformation.parkAdi}</ParkNameText>
        <TypeDescription>Adress</TypeDescription>
        <TypeDescription>Price</TypeDescription>
        <TypeDescription>Stars</TypeDescription>
      </View>
      <RequestButton onPress={() => { props.bookPressed(props.destinationInformation) }}>
        <RequestButtonText>Book</RequestButtonText>
      </RequestButton>
    </Container>
  )
}

export default DetailsIOS


