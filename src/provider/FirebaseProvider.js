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
  const [activeBooked, setActiveBooked] = useState([])
  const [userInformation, setUserInformation] = useState({})

  const [bookedParkHistory, setBookedParkHistory] = useState([])

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

    let bookData = {
      "checkInTime": checkInTime.toLocaleTimeString('tr'),
      "checkOutTime": checkOutTime.toLocaleTimeString('tr'),
      "userId": currentUserUid
    }

    let bookDataIfNotSameTime = {
      [myCheckOutDate]: [
        {
          "checkInTime": checkInTime.toLocaleTimeString('tr'),
          "checkOutTime": checkOutTime.toLocaleTimeString('tr'),
          "userId": currentUserUid
        }
      ]
    }

    let activeDoc = {
      "parkSlot": "",
      "parkName": "",
      "parkId": "",
      "checkInDate": myCheckOutDate,
      "checkInTime": checkInTime.toLocaleTimeString('tr'),
      "checkOutTime": checkOutTime.toLocaleTimeString('tr'),
      "userId": currentUserUid
    }

    userDocument.get().then(querySnapshot => {
      var slotAvaliblity = querySnapshot.docs.map(doc => {
        return checkAvailableStatus(doc, checkInTime, checkOutTime, checkInDate)
      })

      let docNumberToChange = null

      for (let i = 0; i < slotAvaliblity.length; i++) {
        if (slotAvaliblity[i] === undefined) {
          docNumberToChange = i
          break
        }
        if (slotAvaliblity[i] === 'empty') {
          userDocument.doc(querySnapshot.docs[i].id)
            .set(bookDataIfNotSameTime, { merge: true }).then(() => { console.log("Document successfully written!") });

          firestore().collection('users').doc(`${currentUserUid}`).collection('activeBookedPark').add(activeDoc)
          break
        }
      }

      if (docNumberToChange !== null) {
        userDocument.doc(querySnapshot.docs[docNumberToChange].id).get().then(snap => {

          var date = checkInDate.toLocaleDateString().split("/")
          var myCheckOutDate = date.join("-")

          var okeyTime = snap.data()
          var times = okeyTime[myCheckOutDate]
          var myNewTime = [...times]
          myNewTime.push(bookData)
          // console.log(myNewTime);

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
        bookedParkHistory: bookedParkHistory,
        onChangeCheckInTime: onChangeCheckInTime,
        onChangeCheckOutTime: onChangeCheckOutTime,
        onChangeCheckInDate: onChangeCheckInDate,
        checkInTime: checkInTime,
        checkOutTime: checkOutTime,
        checkInDate: checkInDate,
        activeBooked: activeBooked,

        userInformation: userInformation,
        logOut: logOut
      }}>
      { props.children}
    </FirebaseContext.Provider >
  )
};

export { FirebaseProvider, FirebaseContext }
