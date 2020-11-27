import { firebase } from '@react-native-firebase/auth'
import React, { useContext } from 'react'
import { View, Button } from 'react-native'
import { FirebaseContext } from '../../provider/FirebaseProvider'
import {
  Container,
  SearchItemButton,
  SearchItemText,
  Text
} from './style'

const SearchItem = (props) => {

  return (
    <Container>
      <SearchItemButton onPress={() => props.firebaseContext.setSearchItem(props.parkInformation.ParkAdi)}>
        <SearchItemText>
          {props.parkInformation.ParkAdi}
        </SearchItemText>
      </SearchItemButton>
    </Container>
  );
}




export default SearchItem