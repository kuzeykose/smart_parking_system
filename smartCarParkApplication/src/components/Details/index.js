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
        destinationInformation={props.destinationInformation}
        handleBack={props.handleBack}
      />
    </Container >
  )
}

export default Details