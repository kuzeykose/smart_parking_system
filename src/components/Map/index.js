import React from 'react';
import { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; //PROVIDER_DEFAULT uses Apple's map
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
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}
          initialRegion={region}
          showsUserLocation
          loadingEnabled
          ref={el => this.mapView = el}
        >
          {destination && (
            <Directions
              origin={region}
              destination={destination}
              onReady={(result) => {
                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: 50,
                    left: 50,
                    top: 50,
                    bottom: 50
                  }
                })
              }}
            />
          )}
        </MapView>

        <Search onLocationSelected={this.handleLocationSelected} />

      </View >
    );
  }
};


