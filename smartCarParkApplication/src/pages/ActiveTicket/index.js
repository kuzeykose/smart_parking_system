import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../provider/FirebaseProvider'
import Ticket from '../../components/Ticket'

import { ScrollView } from 'react-native';

const ActiveTicket = ({ navigation }) => {
  const value = useContext(FirebaseContext);
  const allTickets = value.userActiveParkData.map((inf, index) => {
    return <Ticket
      information={inf}
      key={index}
      navigation={navigation}
    />
  })

  return (
    <ScrollView>
      {allTickets}
    </ScrollView>
  );
};

export default ActiveTicket;