import React from 'react';
import { UserContext } from '../../navigation/AuthProvider'
import {
  Text,
  SafeAreaView
} from 'react-native';

import {
  Container,
  Card,
  CardText
} from './style'

const Settings = () => {
  return (
    <SafeAreaView>
      <Container>
        <Card>
          <CardText>Bilgi University Santral</CardText>
          <CardText>08/09/2020</CardText>
          <CardText>17:00 -  19:00</CardText>
          <CardText>A02</CardText>
        </Card>
        <Card>
          <CardText>Bilgi University Santral</CardText>
          <CardText>03/10/2020</CardText>
          <CardText>17:00 -  19:00</CardText>
          <CardText>B03</CardText>
        </Card>
      </Container>
    </SafeAreaView>
  );
};

export default Settings;
