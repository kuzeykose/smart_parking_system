import React, { useState } from "react";


import Visa from '../../assets/Visa.png'
import Mastercard from '../../assets/Mastercard.png'
import Discover from '../../assets/Discover.png'
import Amex from '../../assets/Amex.png'

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Card,
  CardText,
  Logo,
  TextContainer,
  InfoImage,
  DeleteButton
} from './style'

import { Alert } from 'react-native'

const PaymentCard = (props) => {
  let myLogo = ''


  switch (parseInt(props.cardNumber[0])) {
    case 3:
      myLogo = Amex
      break;
    case 4:
      myLogo = Visa
      break;
    case 5:
      myLogo = Mastercard
      break;
    case 6:
      myLogo = Discover
      break;
  }


  return (
    <Card>
      <InfoImage>
        {myLogo &&
          <Logo source={myLogo} />
        }
        <TextContainer>
          <CardText>{props.name}</CardText>
          <CardText>{parseInt(props.cardNumber[0]) === 3 ?
            '**** ****** **' + props.cardNumber.substr(-4) :
            props.cardNumber.replace(/\d{4}(?= \d{4})/g, "****")
          }</CardText>
        </TextContainer>
      </InfoImage>
      <DeleteButton onPress={() => {
        Alert.alert(
          "Your payment method will be deleted.",
          "Do you want to delete?",
          [
            {
              text: "No",
              onPress: () => { },
              style: "cancel"
            },
            {
              text: "Yes", onPress: () => {
                console.log("delete");
              }
            }
          ],
          { cancelable: false }
        );
      }} >
        <Icon name="delete" size={27} color="#FF3B3B" />
      </DeleteButton>
    </Card>
  )
}

export default PaymentCard;