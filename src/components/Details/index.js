import React, { Component, useState, useContext } from 'react'
import { Text, View, Button } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment"

import firestore from '@react-native-firebase/firestore';
import { FirebaseContext } from '../../provider/FirebaseProvider'

import {
  Container,
  RequestButton,
  RequestButtonText,
  DateTimeSelectText,
  CheckView,
  CheckContainer
} from './style'

const Details = (props) => {
  const firebaseContext = useContext(FirebaseContext);

  return (
    <Container>
      <CheckContainer>
        <CheckView>
          <DateTimeSelectText>Select parking date!</DateTimeSelectText>
          <DateTimePicker
            testID="dateTimePicker"
            value={firebaseContext.checkInDate}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={firebaseContext.onChangeCheckInDate}
            style={{ width: 120 }}
          />
        </CheckView>
        <CheckView >
          <DateTimeSelectText>Select Check In Time</DateTimeSelectText>
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
          <DateTimeSelectText>Select Check Out Time</DateTimeSelectText>
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
      </CheckContainer>


      <RequestButton onPress={() => {
        // console.log(firebaseContext.checkInTime.toLocaleTimeString('tr'));
        // console.log(firebaseContext.checkOutTime.toLocaleTimeString('tr'));

        firebaseContext.setParkId(props.parkId)
        firebaseContext.setFirebaseUserBook(firebaseContext.parkId)
        // props.handleBack()
      }
      }>
        <RequestButtonText>Book</RequestButtonText>
      </RequestButton>
    </Container >
  )
}

export default Details

//<TypeDescription>loremimpus sit amet del lacorinato lo simicarda</TypeDescription>
//<TypeDescription>price</TypeDescription>


// firestore()
//   .collection('car-parks')
//   .doc('BilgiUniversitySantralCarPark')
//   .collection('parking-slots')
//   .doc('A01')
//   .collection('checks')
//   .add({
//     userId: "",
//     checkIn: checkInDate,
//     checkOutDate: checkOutDate
//   })
//   .then(() => {
//     console.log('User added!');
//   });