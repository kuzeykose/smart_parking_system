import React, { useContext, useState, useEffect } from 'react';
import { Component, Fragment } from 'react';
import { View, Image, SafeAreaView } from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps'; //PROVIDER_DEFAULT uses Apple's map
import MapView from 'react-native-maps';
import { getPixelSize } from '../../utils'
import Search from '../Search'
import Directions from '../Directions'
import ParkInformation from '../ParkInformation'
import Details from '../Details'
import { FirebaseContext } from '../../provider/FirebaseProvider'
import Icon from 'react-native-vector-icons/MaterialIcons';

import backImage from "../../assets/back.png";

import {
  Back,
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeTextSmall,
  LocationTimeText
} from './style'

import DeatilsAndroid from '../DetailsAndroid';

const Map = ({ navigation }) => {


  const firebaseProvider = useContext(FirebaseContext)
  const [popup, setPopup] = useState(null)
  const [region, setRegion] = useState(null)
  // const [destination, setDestination] = useState(null)
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
    firebaseProvider.setSelectedCarPark(null)
    setPopup(null);
  }

  bookPressed = (info) => {
    setPopup(info);
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
        showsBuildings={false}
        ref={el => mapView = el}
      >
        {firebaseProvider.selectedCarPark && (
          <Fragment>
            <Directions
              origin={region}
              destination={firebaseProvider.selectedCarPark}
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
              coordinate={firebaseProvider.selectedCarPark}
              anchor={{ x: 0, y: 0 }} >
              <LocationBox>
                <LocationText>{firebaseProvider.selectedCarPark.parkName}</LocationText>
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
                <LocationText>{firebaseProvider.userInformation.name}</LocationText>
              </LocationBox>
            </Marker>
          </Fragment>
        )}
      </MapView>

      {firebaseProvider.selectedCarPark ? (
        <Fragment>
          <Back onPress={handleBack}>
            <Icon name="keyboard-backspace" size={32} color="#292929" />
          </Back>
          <ParkInformation
            destinationInformation={firebaseProvider.selectedCarPark}
            handleBack={handleBack}
            bookPressed={bookPressed}
          />
        </Fragment>
      ) : (
          <Search />
        )
      }

      <View>
        {popup && (
          <Fragment >
            <Back onPress={handleBack}>
              <Image source={backImage} />
            </Back>
            <Details
              destinationInformation={firebaseProvider.selectedCarPark}
              handleBack={handleBack}
              navigation={navigation}
            />
          </Fragment>
        )}
      </View>

    </View >
  );
}


export default Map