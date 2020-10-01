import React, { Component, useState } from 'react'
import { Text, View, Button } from 'react-native'

import {
  Container,
  TypeTitle,
  TypeDescription,
  RequestButton,
  RequestButtonText,
  SettedText
} from './style'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment"

const Details = (props) => {

  const [isDatePickerVisibleCheckOut, setDatePickerVisibilityCheckOut] = useState(false);
  const [isDatePickerVisibleCheckIn, setDatePickerVisibilityCheckIn] = useState(false);
  const [checkInDate, setCheckInDate] = useState("check in Date")
  const [checkOutDate, setCheckOutDate] = useState("check out Date")

  const showDatePickerCheckIn = () => {
    setDatePickerVisibilityCheckIn(true);
  };

  const showDatePickerCheckOut = () => {
    setDatePickerVisibilityCheckOut(true);
  };


  const hideDatePickerCheckIn = () => {
    setDatePickerVisibilityCheckIn(false);
  };

  const hideDatePickerCheckOut = () => {
    setDatePickerVisibilityCheckOut(false);
  };


  const handleConfirmCheckIn = (date) => {
    let time = moment(date).format("MMMM, Do YYYY HH:mm")
    setCheckInDate(time)
    hideDatePickerCheckIn();
  };

  const handleConfirmCheckOut = (date2) => {
    let time2 = moment(date2).format("MMMM, Do YYYY HH:mm")
    setCheckOutDate(time2)
    hideDatePickerCheckOut();
  };

  return <Container>
    <TypeTitle>{props.parkName} </TypeTitle>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View style={{ flexDirection: "column" }}>
        <Button title={"checkInDate"} onPress={showDatePickerCheckIn} />
        <Button title={"checkOutDate"} onPress={showDatePickerCheckOut} />
      </View>
      <View>
        <View style={{ flexDirection: "column" }}>
          <SettedText>{checkInDate}</SettedText>
          <SettedText>{checkOutDate}</SettedText>
        </View>
      </View>
    </View>
    <DateTimePickerModal
      isVisible={isDatePickerVisibleCheckIn}
      mode="datetime"
      date={new Date()}
      onConfirm={handleConfirmCheckIn}
      onCancel={hideDatePickerCheckIn}
    />
    <DateTimePickerModal
      isVisible={isDatePickerVisibleCheckOut}
      mode="datetime"
      date={new Date()}
      onConfirm={handleConfirmCheckOut}
      onCancel={hideDatePickerCheckOut}
    />


    <RequestButton onPress={() => { }}>
      <RequestButtonText>Book</RequestButtonText>
    </RequestButton>
  </Container>

}

export default Details

//<TypeDescription>loremimpus sit amet del lacorinato lo simicarda</TypeDescription>
//<TypeDescription>price</TypeDescription>