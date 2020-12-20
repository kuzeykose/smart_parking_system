import React, { useContext } from 'react';
import { UserContext } from '../../navigation/AuthProvider'
import { FirebaseContext } from '../../provider/FirebaseProvider';
import VehicleCard from '../../components/VehicleCard'
import LogoSrc from '../../assets/peugeot.png';
import LogoSrc2 from '../../assets/wosvagen.png';

import {
  Container
} from './style'

import {
  SafeAreaView,
} from 'react-native';

const Cars = () => {
  const value = useContext(FirebaseContext);

  const vehicles = value.userVehicle.map((inf, index) => {
    return <VehicleCard
      LogoSrc={LogoSrc}
      carName={inf.name}
      licensePlate={inf.licensePlate}
      key={index}
    />
  })

  return (
    <SafeAreaView>
      <Container>
        {vehicles}
      </Container>
    </SafeAreaView>
  );
};

export default Cars;