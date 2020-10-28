import React from 'react';
import {
  Container,
  Card,
  CardText,
  CustomButton
} from './style'

const Tickets = (props) => {
  return (
    <Card>
      <CardText>{props.parkName}</CardText>
      <CardText>{props.date}</CardText>
      <CardText>{props.time}</CardText>
      <CardText>{props.parkSlotName}</CardText>
    </Card>
  );
};

export default Tickets;
