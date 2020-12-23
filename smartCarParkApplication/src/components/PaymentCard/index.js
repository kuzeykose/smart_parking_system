import React, { useState } from "react";

import Visa from '../../assets/Visa.png'
import Mastercard from '../../assets/Mastercard.png'
import Discover from '../../assets/Discover.png'
import Amex from '../../assets/Amex.png'

import {
  Card,
  CardText,
  Logo,
  TextContainer,
} from './style'

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
      {myLogo &&
        <Logo source={myLogo} />
      }
      <TextContainer>
        <CardText>{props.name}</CardText>
        <CardText>{props.cardNumber}</CardText>
      </TextContainer>
    </Card>
  )
}

export default PaymentCard;