import React, { useContext } from 'react'
import { Platform, View } from 'react-native';

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
    <View>
      <PlatformDetails
        destinationInformation={props.destinationInformation}
        handleBack={props.handleBack}
        navigation={props.navigation}
      />
    </View >
  )
}

export default Details