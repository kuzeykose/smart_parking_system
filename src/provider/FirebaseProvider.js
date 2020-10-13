import React, { createContext, useState, useEffect } from 'react';
import Auth from '@react-native-firebase/auth';
import firestore, { firebase } from '@react-native-firebase/firestore';

import { checkAvailableStatus } from './FirebaseProviderHelpers/checkAvailableStatus'

const FirebaseContext = React.createContext(null)

const FirebaseProvider = (props) => {
  //get parkId for send Firestore specific position
  const [parkId, setParkId] = useState("")
  const [checkInTime, setCheckInTime] = useState(new Date(2020, 1, 1, 0, 0, 0))
  const [checkOutTime, setCheckOutTime] = useState(new Date(2020, 1, 1, 0, 0, 0))
  const [checkInDate, setCheckInDate] = useState(new Date())
  const [userInformation, setUserInformation] = useState({})

  const onChangeCheckInTime = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setCheckInTime(currentDate);
  }

  const onChangeCheckOutTime = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setCheckOutTime(currentDate);
  }

  const onChangeCheckInDate = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setCheckInDate(currentDate);
  }

  useEffect(() => {
    firestore().collection('users').doc(`${currentUserUid}`)
      .get()
      .then(snapShot => {
        setUserInformation(snapShot.data())
      })
  })

  const currentUserUid = Auth().currentUser.uid

  // set Firebase car - parks slots from taking data from user -> (car - parks / { parkId } / parking - slot)
  const setFirebaseUserBook = (parkId) => {
    const userDocument = firestore().collection('car-parks').doc(parkId).collection('parking-slots')
    var date = checkInDate.toLocaleDateString().split("/")
    var myCheckOutDate = date.join("-")


    let bookData = { // available or not uses
      "checkInTime": checkInTime.toLocaleTimeString('tr'),
      "checkOutTime": checkOutTime.toLocaleTimeString('tr'),
      "userId": currentUserUid
    }

    let bookDataIfNotSameTime = { // empty uses because creating date at the same time
      [myCheckOutDate]: [
        {
          "checkInTime": checkInTime.toLocaleTimeString('tr'),
          "checkOutTime": checkOutTime.toLocaleTimeString('tr'),
          "userId": currentUserUid
        }
      ]
    }

    let activeDoc = { // for user active data
      "parkSlot": "",
      "parkName": "",
      "parkId": "",
      "checkInDate": myCheckOutDate,
      "checkInTime": checkInTime.toLocaleTimeString('tr'),
      "checkOutTime": checkOutTime.toLocaleTimeString('tr'),
      "userId": currentUserUid
    }

    //get document in firebase and set slotAvaliblity with empty/available/notAvailable
    userDocument.get().then(querySnapshot => {
      var slotAvaliblity = querySnapshot.docs.map(doc => {
        return checkAvailableStatus(doc, checkInTime, checkOutTime, checkInDate)
      })


      let docNumberToChange = null
      // look each element -> database sends undefined where selected items doesnt exist
      for (let i = 0; i < slotAvaliblity.length; i++) {
        // get first undefined slot and change docNumberToChange
        if (slotAvaliblity[i] === undefined) {
          docNumberToChange = i
          break
        }
        // get first empty item and write/create the array inside database
        if (slotAvaliblity[i] === 'empty') {
          userDocument.doc(querySnapshot.docs[i].id)
            .set(bookDataIfNotSameTime, { merge: true }).then(() => { console.log("Document successfully written!") });
          firestore().collection('users').doc(`${currentUserUid}`).collection('activeBookedPark').add(activeDoc)
          break
        }
      }
      // docNumberToChange not null means that date is exist but the time doesnt used.
      // get date array information copy it and push inside the selected items then send back
      if (docNumberToChange !== null) {
        userDocument.doc(querySnapshot.docs[docNumberToChange].id).get().then(snap => {

          var date = checkInDate.toLocaleDateString().split("/")
          var myCheckOutDate = date.join("-")

          var okeyTime = snap.data()
          var times = okeyTime[myCheckOutDate]
          var myNewTime = [...times]
          myNewTime.push(bookData)

          let mylastObject = {
            [myCheckOutDate]: myNewTime
          }
          userDocument.doc(snap.id)
            .set(mylastObject, { merge: true }).then(() => { console.log("Document successfully written!") });
          firestore().collection('users').doc(`${currentUserUid}`).collection('activeBookedPark').add(activeDoc)
        })
      } else {
        console.log("Not Available");
      }

    }).catch(function (error) {
      console.log("Error getting document:", error);
    })
  }

  const logOut = () => {
    Auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  return (
    <FirebaseContext.Provider
      value={{
        parkId: parkId,
        setParkId: setParkId,
        setFirebaseUserBook: setFirebaseUserBook,
        onChangeCheckInTime: onChangeCheckInTime,
        onChangeCheckOutTime: onChangeCheckOutTime,
        onChangeCheckInDate: onChangeCheckInDate,
        checkInTime: checkInTime,
        checkOutTime: checkOutTime,
        checkInDate: checkInDate,
        userInformation: userInformation,
        logOut: logOut
      }}>
      { props.children}
    </FirebaseContext.Provider >
  )
};

export { FirebaseProvider, FirebaseContext }
