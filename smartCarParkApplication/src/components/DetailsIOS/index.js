import React, { useContext } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { FirebaseContext } from '../../provider/FirebaseProvider'

import {
  RequestButton,
  RequestButtonText,
  DateTimeSelectText,
  CheckView,
  CheckContainer
} from './style'
import { View } from 'react-native';

const DetailsIOS = (props) => {
  const firebaseContext = useContext(FirebaseContext);
  const selectedParkId = props.parkId;

  return (
    <View>
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
        firebaseContext.userBook(selectedParkId)
      }}>
        <RequestButtonText>Book</RequestButtonText>
      </RequestButton>
    </View>
  )
}

export default DetailsIOS