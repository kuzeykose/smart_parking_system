import React, { useContext, useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { FirebaseContext } from '../../provider/FirebaseProvider'
import Stars from '../Stars'

import {
  RequestButton,
  RequestButtonText,
  DateTimeSelectText,
  CheckView,
  CheckContainer,
  Container,
  ParkNameText,
  TypeDescription
} from './style'
import { Alert, View } from 'react-native';

const DetailsIOS = (props) => {
  const firebaseContext = useContext(FirebaseContext);
  const destinationInformation = props.destinationInformation;
  const handleBack = props.handleBack
  const navigation = props.navigation

  const parseTime = (s) => {
    var c = s.split(':');
    return parseInt(c[0]) * 60 + parseInt(c[1]);
  }

  const priceForSelectedTime = () => {
    const timeOptions = { hour12: false, hour: '2-digit', minute: '2-digit' }
    const stringCheckInTime = firebaseContext.checkInTime.toLocaleTimeString('en-US', timeOptions)
    const stringCheckOutTime = firebaseContext.checkOutTime.toLocaleTimeString('en-US', timeOptions)
    var estimatedParkingTime = (parseTime(stringCheckOutTime) - parseTime(stringCheckInTime)) / 60;

    if (firebaseContext.checkInTime < firebaseContext.checkOutTime) {
      for (let i = 0; i < destinationInformation.priceList.length; i++) {
        const timeSpace = destinationInformation.priceList[i].Tarife.split('-')
        // console.log(timeSpace);
        if (timeSpace[1]) {
          const initialTime = parseInt(timeSpace[0])
          const endTime = parseInt(timeSpace[1].substring(0, 2))
          if (estimatedParkingTime >= initialTime && estimatedParkingTime <= endTime) {
            // setPrice(destinationInformation.priceList[i].Fiyat)
            return destinationInformation.priceList[i].Fiyat / 100
          }
        }
        if (timeSpace[1] === undefined) {
          // setPrice(destinationInformation.priceList[i].Fiyat)
          return destinationInformation.priceList[i].Fiyat / 100
        }
      }
    } else {
      Alert.alert("Please acceptable time")
    }
  }

  var price = priceForSelectedTime()

  return (
    <Container>
      <View>
        <ParkNameText>{destinationInformation.parkName}</ParkNameText>
        <TypeDescription>{destinationInformation.address}</TypeDescription>
        <Stars rating={destinationInformation.rating} />
      </View>

      <CheckContainer>
        <CheckView>
          <DateTimeSelectText>Check-in Date</DateTimeSelectText>
          <DateTimePicker
            testID="dateTimePicker"
            value={firebaseContext.checkInDate}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={firebaseContext.onChangeCheckInDate}
            style={{ width: 120 }}
            minimumDate={new Date()}
          />
        </CheckView>
        <CheckView >
          <DateTimeSelectText>Check-in Time</DateTimeSelectText>
          <DateTimePicker
            value={firebaseContext.checkInTime}
            mode="time"
            is24Hour={true}
            minuteInterval={15}
            display="inline"
            onChange={firebaseContext.onChangeCheckInTime}
            locale="tr"
            style={{ width: 100 }}
          />
        </CheckView>

        <CheckView>
          <DateTimeSelectText>Check-out Time</DateTimeSelectText>
          <DateTimePicker
            testID="dateTimePicker"
            value={firebaseContext.checkOutTime}
            mode={'time'}
            is24Hour={true}
            display="inline"
            minuteInterval={15}
            onChange={firebaseContext.onChangeCheckOutTime}
            locale="tr"
            style={{ width: 100 }}
          />
        </CheckView>

        <CheckView>
          <DateTimeSelectText>Price:</DateTimeSelectText>
          <DateTimeSelectText>{price} ₺</DateTimeSelectText>
        </CheckView>
      </CheckContainer>

      <RequestButton onPress={() => {
        // if (firebaseContext.userVehicle.length === 0) {
        //   navigation.navigate('Add Car');
        //   Alert.alert("You have to add Vehicle and Payment method for booking")
        // } else if (firebaseContext.userPaymentMethods.length === 0) {
        //   navigation.navigate('Add Payment Method');
        //   Alert.alert("You have to add Vehicle and Payment method for booking")
        // }

        // if (firebaseContext.userVehicle.length != 0 && firebaseContext.userPaymentMethods.length != 0) {
        if (firebaseContext.checkInTime < firebaseContext.checkOutTime) {
          navigation.navigate('Payment', {
            destinationInformation,
            price
          });
        } else {
          Alert.alert("Please select")
        }
        // }
      }}>
        <RequestButtonText>Go to Payment</RequestButtonText>
      </RequestButton>
    </Container>
  )
}

export default DetailsIOS


