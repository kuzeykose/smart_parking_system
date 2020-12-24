import React, { useContext } from 'react'
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

  return (
    <Container>
      <View>
        <ParkNameText>{destinationInformation.ParkName}</ParkNameText>
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
        </CheckView>
      </CheckContainer>

      <RequestButton onPress={() => {
        if (firebaseContext.checkInTime < firebaseContext.checkOutTime) {
          navigation.navigate('Payment', {
            destinationInformation
          });
        } else {
          Alert.alert("Please select ")
        }

      }}>
        <RequestButtonText>Go to Payment</RequestButtonText>
      </RequestButton>
    </Container>
  )
}

export default DetailsIOS


