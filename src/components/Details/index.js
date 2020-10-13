import React, { useContext } from 'react'

import DateTimePicker from '@react-native-community/datetimepicker';
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
            minimumDate={new Date()}
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
        firebaseContext.setParkId(props.parkId)

        firebaseContext.setFirebaseUserBook(firebaseContext.parkId)
        props.bookedArea()
      }
      }>
        <RequestButtonText>Book</RequestButtonText>
      </RequestButton>
    </Container >
  )
}

export default Details