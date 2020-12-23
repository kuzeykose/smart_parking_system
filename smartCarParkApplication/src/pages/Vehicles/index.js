import React, { useContext } from 'react';
import { UserContext } from '../../navigation/AuthProvider'
import { FirebaseContext } from '../../provider/FirebaseProvider';
import VehicleCard from '../../components/VehicleCard'
import LogoSrc from '../../assets/peugeot.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  Card,
  DeleteButton
} from './style'

import {
  SafeAreaView,
  Alert
} from 'react-native';

const Cars = () => {
  const value = useContext(FirebaseContext);

  const vehicles = value.userVehicle.map((inf, index) => {
    return <Card key={index}><VehicleCard
      LogoSrc={LogoSrc}
      carName={inf.name}
      licensePlate={inf.licensePlate}
    />
      <DeleteButton onPress={() => {
        Alert.alert(
          "Your vehicle will be deleted.",
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
      </DeleteButton></Card>
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