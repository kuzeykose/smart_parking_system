import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../provider/FirebaseProvider'
import Ticket from '../../components/Ticket'

import { ScrollView } from 'react-native';

const Tickets = () => {
  const value = useContext(FirebaseContext);
  console.log(value.userActiveParkData);
  // const allTickets = value.userActiveParkData.map((inf, index) => {
  //   return <Ticket
  //     parkName={inf.parkName}
  //     date={inf.checkInDate}
  //     time={inf.checkInTime + " - " + inf.checkOutTime}
  //     parkSlotName={inf.parkSlot}
  //     key={index}
  //     latitude={inf.latitude}
  //     longitude={inf.longitude}
  //   />
  // }
  // )
  return (
    <ScrollView>
      {/* {allTickets} */}
    </ScrollView>
  );
};

export default Tickets;

// <Button
// onPress={() => {
//   value.setCancel([inf.checkInDate, inf.checkInTime, inf.checkOutTime])
// }}
// title="Cancel" color='red' />