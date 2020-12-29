import React, { useContext } from 'react';
import { UserContext } from '../../navigation/AuthProvider'
import { FirebaseContext } from '../../provider/FirebaseProvider';
import PaymentCard from '../../components/PaymentCard'

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

const PaymentMethods = () => {
  const value = useContext(FirebaseContext);

  const PaymentCards = value.userPaymentMethods.map((inf, index) => {
    return <Card key={index}><PaymentCard
      name={inf.nameSurname}
      cardNumber={inf.cardNumber}
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
                value.deletePaymentMethod(inf.nameSurname, inf.cardNumber)
              }
            }
          ],
          { cancelable: false }
        );
      }} >
        <Icon name="delete" size={27} color="#FF3B3B" />
      </DeleteButton>
    </Card >
  })

  return (
    <SafeAreaView>
      <Container>
        {PaymentCards}
      </Container>
    </SafeAreaView>
  );
};

export default PaymentMethods;