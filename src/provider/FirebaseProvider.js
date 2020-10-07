import React, { createContext, useState, useEffect } from 'react';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const FirebaseContext = React.createContext(null)

const FirebaseProvider = (props) => {
  //get parkId for send Firestore specific position
  const [parkId, setParkId] = useState("")
  const [checkInTime, setCheckInTime] = useState("11:00")
  const [checkOutTime, setCheckOutTime] = useState("24:00")
  const [checkInDate, setCheckInDate] = useState("5/10/2020")
  const [checkOutDate, setCheckOutDate] = useState("5/10/2020")
  const [bookedParkHistory, setBookedParkHistory] = useState([])

  const currentUserUid = Auth().currentUser.uid
  let usersParkInformation = ''

  useEffect(() => {
    firestore().collection('users').doc(`${currentUserUid}`).collection('bookedParkHistory')
      .get()
      .then(snapShot => {
        let myArray = []
        snapShot.forEach(doc => {
          myArray.push(doc.data())
        })
        setBookedParkHistory(myArray)
      })
  })


  //set Firebase car-parks slots from taking data from user -> (car-parks/{parkId}/parking-slot)
  const setFirebaseUserBook = (parkId) => {
    let bookData = {
      "5/10/2020": [
        {
          "checkInTime": checkInTime,
          "checkOutTime": checkOutTime,
          "userId": ""
        }
      ]
    }

    const userDocument = firestore().collection('car-parks').doc(parkId).collection('parking-slots')

    userDocument.get().then(querySnapshot => {
      var myData = querySnapshot.docs.map(doc => {
        const parkSlotData = doc.data()
        const dataFromSlot = parkSlotData[`${checkInDate}`]

        for (let i = 0; i < dataFromSlot.length; i++) {
          if (dataFromSlot[i]["checkInTime"] === checkInTime) {
            return "notAvailable"
          }
        }
      })

      let docNumberToChange = null
      for (let i = 0; i < myData.length; i++) {
        if (myData[i] !== "notAvailable") {
          docNumberToChange = i
          break
        }
      }
      if (docNumberToChange !== null) {
        userDocument.doc(querySnapshot.docs[docNumberToChange].id)
          .set(bookData).then(() => { console.log("Document successfully written!") });
      } else {
        console.log("not available");
      }

    }).catch(function (error) {
      console.log("Error getting document:", error);
    })
  }

  return (
    <FirebaseContext.Provider
      value={{
        parkId: parkId,
        setParkId: setParkId,
        setFirebaseUserBook: setFirebaseUserBook,
        bookedParkHistory: bookedParkHistory
      }}>
      {props.children}
    </FirebaseContext.Provider>
  )
};

export { FirebaseProvider, FirebaseContext }


// querySnapshot.forEach(doc => {
//   const myData = doc.data() //get doc inside 'parking slots'
//   const dateAndTimes = myData[`${checkInDate}`]

//   // console.log(doc.id, myData);
//   for (let i = 0; i < dateAndTimes.length; i++) {
//     const dateAndTimesVar = myData[`${checkInDate}`][i]
//     if (dateAndTimesVar["checkInTime"] === checkInTime) {
//       console.log(dateAndTimesVar);
//     }
//   }
// })


// if (dateAndTimesVar["checkInTime"] === checkInTime) {
//   console.log("not available");
// } else {
//   isCheckInTimeInSlot = true
// }

// if (isCheckInTimeInSlot) {
//   let bookData = {
//     "checkInTime": checkInTime,
//     "checkOutTime": checkOutTime,
//     "userId": ""
//   }
//   dateAndTimes.push(bookData)
//   // console.log(dateAndTimes);

//   userDocument.doc(doc.id).set({
//     "5/10/2020": dateAndTimes
//   })
// }