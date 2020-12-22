import React from "react";

import {
  Card,
  CardText,
  Logo,
  TextContainer,
} from './style'

const PaymentCard = (props) => (
  <Card>
    <Logo source={props.LogoSrc} />
    <TextContainer>
      <CardText>{props.name}</CardText>
      <CardText>{props.cardNumber}</CardText>
    </TextContainer>
  </Card>
);


export default PaymentCard