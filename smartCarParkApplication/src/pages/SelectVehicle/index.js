import React, { useContext } from 'react';
import { UserContext } from '../../navigation/AuthProvider'
import { FirebaseContext } from '../../provider/FirebaseProvider';
import VehicleCard from '../../components/VehicleCard'
import LogoSrc from '../../assets/peugeot.png';
import LogoSrc2 from '../../assets/wosvagen.png';

import {
  Container,
  Card
} from './style'

import {
  SafeAreaView,
  TouchableOpacity
} from 'react-native';

const SelectVehicle = ({ route, navigation: { goBack } }) => {
  const { setSelectedCar } = route.params;
  const value = useContext(FirebaseContext);

  const vehicles = value.userVehicle.map((inf, index) => {
    return <Card key={index} onPress={() => {
      setSelectedCar(inf)
      goBack()
    }}>
      <VehicleCard
        LogoSrc={LogoSrc}
        carName={inf.name}
        licensePlate={"34 PG 2020"}
      />
    </Card>
  })

  return (
    <SafeAreaView>
      <Container>
        {vehicles}
      </Container>
    </SafeAreaView >
  );
};

export default SelectVehicle;