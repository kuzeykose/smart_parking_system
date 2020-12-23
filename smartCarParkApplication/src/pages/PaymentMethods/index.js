import React, { useContext } from 'react';
import { UserContext } from '../../navigation/AuthProvider'
import { FirebaseContext } from '../../provider/FirebaseProvider';
import PaymentCard from '../../components/PaymentCard'

import {
  Container,
  Card
} from './style'

import {
  SafeAreaView,
} from 'react-native';

const PaymentMethods = () => {
  const value = useContext(FirebaseContext);

  const PaymentCards = value.userPaymentMethods.map((inf, index) => {
    return <Card key={index}><PaymentCard
      name={inf.nameSurname}
      cardNumber={inf.cardNumber}
    /></Card>
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