import React, { useContext } from 'react'
import { View, Button, Text } from 'react-native'
import { FirebaseContext } from '../../provider/FirebaseProvider'

import {
  Container,
  SearchItemButton,
  SearchItemText,
  SubInformation,
  Stars,
  Price
} from './style'

const SearchItem = (props) => {
  return (
    <Container>
      <SearchItemButton onPress={() => props.firebaseContext.setSearchItem(props.parkInformation.ParkAdi)}>
        <SearchItemText>
          {props.parkInformation.ParkAdi}
        </SearchItemText>
      </SearchItemButton>
      <SubInformation>
        <Stars>{props.parkInformation.rating}</Stars>
      </SubInformation>
    </Container>
  );
}




export default SearchItem