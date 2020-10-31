import React, { useContext } from 'react'
import { Platform } from 'react-native';

import DetailsIOS from '../DetailsIOS'
import DetailsAndroid from '../DetailsAndroid'

import {
  Container
} from './style'

const Details = (props) => {
  const PlatformDetails = Platform.select({
    ios: () => DetailsIOS,
    android: () => DetailsAndroid
  })();

  return (
    <Container>
      <PlatformDetails
        parkId={props.parkId}
        handleBack={props.handleBack}
      />
    </Container >
  )
}

export default Details