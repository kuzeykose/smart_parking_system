import React, { useContext, useState, useEffect } from 'react';
import { Component, Fragment } from 'react';
import { View, Image } from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps'; //PROVIDER_DEFAULT uses Apple's map
import MapView from 'react-native-maps';
import { getPixelSize } from '../../utils'
import Search from '../Search'
import Directions from '../Directions'
import Details from '../Details'
import { FirebaseContext } from '../../provider/FirebaseProvider'

import backImage from "../../assets/back.png";

import {
  Back,
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeTextSmall,
  LocationTimeText

} from './style'

const Map = () => {
  const value = useContext(FirebaseContext)
  const [region, setRegion] = useState(null)
  const [destination, setDestination] = useState(null)
  const [duration, setDuration] = useState(null)

  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0143,
          longitudeDelta: 0.0143
        })
      },
      () => { },
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000
      }
    )
  }, [])



  handleBack = () => {
    setDestination(null)
  }

  handleLocationSelected = (data, { geometry }) => {
    const { location: { lat: latitude, lng: longitude } } = geometry
    console.log(geometry);
    setDestination({
      latitude: latitude,
      longitude: longitude,
      title: data.description,
      parkId: data.id
    })
  }

  // const { region, destination, duration } = this.state
  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}
        initialRegion={region}
        showsUserLocation={true}
        loadingEnabled
        ref={el => mapView = el}
      >
        {destination && (
          <Fragment>
            <Directions
              origin={region}
              destination={destination}
              onReady={(result) => {
                setDuration(Math.floor(result.duration))
                mapView.fitToCoordinates(result.coordinates, {
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
                <LocationText>{value.userInformation.name}</LocationText>
              </LocationBox>
            </Marker>
          </Fragment>
        )}
      </MapView>
      {destination ? (
        <Fragment>
          <Back onPress={handleBack}>
            <Image source={backImage} />
          </Back>
          <Details
            destinationInformation={destination}
            handleBack={handleBack}
          />
        </Fragment>
      ) : (
          <Search onLocationSelected={handleLocationSelected} />
        )}
    </View >
  );
}



export default Map