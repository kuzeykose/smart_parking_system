import React from "react";


import {
  Card,
  CardText,
  Logo,
  TextContainer,
  DeleteButton,
} from './style'

const VehicleCard = (props) => (
  <Card>
    <Logo source={props.LogoSrc} />
    <TextContainer>
      <CardText>{props.carName}</CardText>
      <CardText>{props.licensePlate}</CardText>
    </TextContainer>
  </Card>
);


export default VehicleCard