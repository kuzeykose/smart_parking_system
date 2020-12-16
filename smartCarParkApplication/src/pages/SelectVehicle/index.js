import React, { useContext } from 'react';
import { UserContext } from '../../navigation/AuthProvider'
import { FirebaseContext } from '../../provider/FirebaseProvider';
import VehicleCard from '../../components/VehicleCard'
import LogoSrc from '../../assets/peugeot.png';
import LogoSrc2 from '../../assets/wosvagen.png';

import {
  Container,
} from './style'

import {
  SafeAreaView,
  TouchableOpacity
} from 'react-native';

const SelectVehicle = ({ navigation: { goBack } }) => {
  const value = useContext(FirebaseContext);
  return (
    <SafeAreaView>
      <Container>
        <TouchableOpacity onPress={() => goBack()}>
          <VehicleCard
            LogoSrc={LogoSrc}
            carName={"Kuzey Araba"}
            licensePlate={"34 PG 2020"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => value.setSelectedCar()}>
          <VehicleCard
            LogoSrc={LogoSrc2}
            carName={"Kuzey Araba 2"}
            licensePlate={"34 WV 2020"}
          />
        </TouchableOpacity>
      </Container>
    </SafeAreaView >
  );
};

export default SelectVehicle;