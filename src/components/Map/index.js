import React from 'react';
import { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import MapView from 'react-native-maps'; //PROVIDER_DEFAULT uses Apple's map
import Geolocation from '@react-native-community/geolocation';

import Search from '../Search'

export default class Map extends Component {
  state = {
    region: null
  }

  async componentDidMount() {
    Geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this.setState({
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.004
          }
        })
      },
      () => { },
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000
      }
    )
  }

  render() {
    const { region } = this.state
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}
          initialRegion={region}
          showsUserLocation
          loadingEnabled
        />
        <Search />

      </View >
    );
  }
};


