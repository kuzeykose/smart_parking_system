import React, { useContext } from 'react';
import { FirebaseContext } from '../../provider/FirebaseProvider';
import PaymentCard from "../../components/PaymentCard"

import {
  Container,
} from './style'

import {
  SafeAreaView,
  TouchableOpacity
} from 'react-native';

const SelectedPaymentMethod = ({ route, navigation: { goBack } }) => {
  const { setSelectedPaymentMethod } = route.params;
  const value = useContext(FirebaseContext);

  const paymentMethods = value.userPaymentMethods.map((inf, index) => {
    return <TouchableOpacity onPress={() => {
      setSelectedPaymentMethod(inf)
      goBack()
    }}>
      <PaymentCard
        name={inf.nameSurname}
        cardNumber={inf.cardNumber}
        key={index}
      />
    </TouchableOpacity>
  })

  return (
    <SafeAreaView>
      <Container>
        {paymentMethods}
      </Container>
    </SafeAreaView >
  );
};

export default SelectedPaymentMethod;