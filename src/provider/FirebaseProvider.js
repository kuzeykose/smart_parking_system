import React, { createContext, useState } from 'react';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const FirebaseContext = React.createContext()

const FirebaseProvider = (props) => {
  //get parkId for send Firestore specific position
  const [parkId, setParkId] = useState("")

  //set Firebase car-parks slots from taking data from user -> (car-parks/{parkId}/parking-slot)
  const setFirebaseUserBook = (parkId) => {
    const userDocument =
      firestore()
        .collection('car-parks')
        .doc(parkId)
        .collection('parking-slots')

    userDocument.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // console.log(doc.id);

        const myData = doc.data() //get doc inside 'parking slots'
        if (myData["08:00"]["available"]) { //if myData '08:00'-> 'available: true' -> write console
          console.log(doc.id, " => ", myData["08:00"]);
        }

        // userDocument.doc(`${doc.id}`).onSnapshot(function (doc2) {

        // });
      })
    }).catch(function (error) {
      console.log("Error getting document:", error);
    })
  }

  return (
    <FirebaseContext.Provider
      value={{
        parkId: parkId,
        setParkId: setParkId,
        setFirebaseUserBook: setFirebaseUserBook
      }}>
      {props.children}
    </FirebaseContext.Provider>
  )
};

export { FirebaseProvider, FirebaseContext }