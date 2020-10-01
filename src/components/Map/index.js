import React from 'react';
import { Component, Fragment } from 'react';
import { View, Image } from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps'; //PROVIDER_DEFAULT uses Apple's map

import { getPixelSize } from '../../utils'
import Search from '../Search'
import Directions from '../Directions'
import Details from '../Details'

import backImage from "../../assets/back.png";

import {
  Back,
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeTextSmall,
  LocationTimeText

} from './style'

export default class Map extends Component {
  state = {
    region: null,
    destination: null,
    duration: null
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

  handleBack = () => {
    this.setState({ destination: null })
  }

  bookedArea = () => {
    alert("Booked!")
    this.setState({ destination: null })
  }

  handleLocationSelected = (data, { geometry }) => {
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
    const { region, destination, duration } = this.state
    return (
      <View style={{ flex: 1 }}>
        <MapView
          provider={PROVIDER_DEFAULT}
          style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}
          initialRegion={region}
          showsUserLocation
          loadingEnabled
          ref={el => this.mapView = el}
        >
          {destination && (
            <Fragment>
              < Directions
                origin={region}
                destination={destination}
                onReady={(result) => {
                  this.setState({ duration: Math.floor(result.duration) })
                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: getPixelSize(50),
                      left: getPixelSize(50),
                      top: getPixelSize(50),
                      bottom: getPixelSize(350)
                    }
                  })
                }}
              />
              <Marker
                coordinate={destination}
                anchor={{ x: 0, y: 0 }} >
                <LocationBox>
                  <LocationText>{destination.title}</LocationText>
                </LocationBox>
              </Marker>

              <Marker
                coordinate={region}
                anchor={{ x: 0, y: 0 }} >
                <LocationBox>
                  <LocationTimeBox>
                    <LocationTimeText>{duration}</LocationTimeText>
                    <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                  </LocationTimeBox>
                  <LocationText>User Name</LocationText>
                </LocationBox>
              </Marker>
            </Fragment>
          )}
        </MapView>
        {destination ? (
          <Fragment>
            <Back onPress={this.handleBack}>
              <Image source={backImage} />
            </Back>
            <Details parkName={destination.title} handleBack={this.bookedArea} />
          </Fragment>

        ) : (
            <Search onLocationSelected={this.handleLocationSelected} />
          )}
      </View >
    );
  }
};


