import React, { useContext } from 'react';
import { UserContext } from '../../navigation/AuthProvider'
import { FirebaseContext } from '../../provider/FirebaseProvider';
import VehicleCard from '../../components/VehicleCard'
import LogoSrc from '../../assets/peugeot.png';
import LogoSrc2 from '../../assets/wosvagen.png';

import {
  Card,
  CardText,
  Logo,
  TextContainer,
  Container
} from './style'

import {
  SafeAreaView,
} from 'react-native';

const Cars = () => {
  const value = useContext(FirebaseContext);
  return (
    <SafeAreaView>
      <Container>
        <VehicleCard
          LogoSrc={LogoSrc}
          carName={"Kuzey Araba"}
          licensePlate={"34 PG 2020"}
        />
        <VehicleCard
          LogoSrc={LogoSrc2}
          carName={"Kuzey Araba 2"}
          licensePlate={"34 WV 2020"}
        />
      </Container>
    </SafeAreaView>
  );
};

export default Cars;