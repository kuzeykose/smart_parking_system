import React from 'react';
import { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import MapView from 'react-native-maps'; //PROVIDER_DEFAULT uses Apple's map
import Geolocation from '@react-native-community/geolocation';

import Search from '../Search'
import Directions from '../Directions'

export default class Map extends Component {
  state = {
    region: null,
    destination: null
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

  handleLocationSelected = (data, { geometry }) => {
    console.log(data);
    const { location: { lat: latitude, lng: longitude } } = geometry

    this.setState({
      destination: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text
      }
    })
  }

  render() {
    const { region, destination } = this.state
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}
          initialRegion={region}
          showsUserLocation
          loadingEnabled
        >
          {destination && (
            <Directions
              origin={region}
              destination={destination}
              onReady={() => {

              }}
            />
          )}
        </MapView>

        <Search onLocationSelected={this.handleLocationSelected} />

      </View >
    );
  }
};


