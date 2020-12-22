import React, { useContext } from 'react';
import { UserContext } from '../../navigation/AuthProvider'
import { FirebaseContext } from '../../provider/FirebaseProvider';
import PaymentCard from '../../components/PaymentCard'

import {
  Container
} from './style'

import {
  SafeAreaView,
} from 'react-native';

const PaymentMethods = () => {
  const value = useContext(FirebaseContext);
  const myCard = [{ name: 'kuzey kose', cardNumber: '0000 0000 0000 0000' }]

  const PaymentCards = myCard.map((inf, index) => {
    return <PaymentCard
      name={inf.name}
      cardNumber={inf.cardNumber}
      key={index}
    />
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