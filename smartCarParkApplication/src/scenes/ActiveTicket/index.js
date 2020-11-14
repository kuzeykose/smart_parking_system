import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../provider/FirebaseProvider'
import Ticket from '../../components/Ticket'

import { ScrollView } from 'react-native';

const Tickets = () => {
  const value = useContext(FirebaseContext);

  const allTickets = value.userActiveParkData.map((inf, index) => {
    return <Ticket
      parkId={inf.parkId}
      checkInDate={inf.checkInDate}
      checkInTime={inf.checkInTime}
      checkOutTime={inf.checkOutTime}
      parkSlotName={inf.parkSlot}
      key={index}
      latitude={inf.latitude}
      longitude={inf.longitude}
    />
  }
  )

  return (
    <ScrollView>
      {allTickets}
    </ScrollView>
  );
};

export default Tickets;