import React, { createContext, useState } from 'react';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const FirebaseContext = React.createContext()

const FirebaseProvider = (props) => {
  //get parkId for send Firestore specific position
  const [parkId, setParkId] = useState("")
  const [checkInTime, setCheckInTime] = useState("17:00")
  const [checkOutTime, setCheckOutTime] = useState("24:00")
  const [checkInDate, setCheckInDate] = useState("5/10/2020")
  const [checkOutDate, setCheckOutDate] = useState("5/10/2020")

  //set Firebase car-parks slots from taking data from user -> (car-parks/{parkId}/parking-slot)
  const setFirebaseUserBook = (parkId) => {
    const userDocument =
      firestore()
        .collection('car-parks')
        .doc(parkId)
        .collection('parking-slots')

    userDocument.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const myData = doc.data() //get doc inside 'parking slots'

        const dateAndTimes = myData[`${checkInDate}`]

        for (let i = 0; i < dateAndTimes.length; i++) {
          const dateAndTimesVar = myData[`${checkInDate}`][i]

          //check is park space is available
          if (dateAndTimesVar["checkInTime"] === checkInTime || dateAndTimesVar["checkOutTime"] === checkOutTime) {
            console.log("isn't okey");
          } else {
            let bookData = {
              "checkInTime": checkInTime,
              "checkOutTime": checkOutTime,
              "userId": ""
            }
            dateAndTimes.push(bookData)
            console.log(dateAndTimes);

            userDocument.doc(doc.id).set({
              "5/10/2020": dateAndTimes
            })
            break
          }
        }

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