import React, { createContext, useState, useEffect } from 'react';
import Auth from '@react-native-firebase/auth';
import firestore, { firebase } from '@react-native-firebase/firestore';

const FirebaseContext = React.createContext(null)

const FirebaseProvider = (props) => {
  //get parkId for send Firestore specific position
  const [parkId, setParkId] = useState("")
  const [checkInTime, setCheckInTime] = useState(new Date(2020, 1, 1, 0, 0, 0))
  const [checkOutTime, setCheckOutTime] = useState(new Date(2020, 1, 1, 0, 0, 0))
  const [checkInDate, setCheckInDate] = useState(new Date())

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

  const currentUserUid = Auth().currentUser.uid
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
  }, [bookedParkHistory])


  // set Firebase car - parks slots from taking data from user -> (car - parks / { parkId } / parking - slot)
  const setFirebaseUserBook = (parkId) => {
    const userDocument = firestore().collection('car-parks').doc(parkId).collection('parking-slots')
    var date = checkInDate.toLocaleDateString().split("/")
    var myCheckOutDate = date.join("-")
    let bookData = {
      "checkInTime": checkInTime.toLocaleTimeString('tr'),
      "checkOutTime": checkOutTime.toLocaleTimeString('tr'),
      "userId": ""
    }
    let bookDataIfNotSameTime = {
      [myCheckOutDate]: [
        {
          "checkInTime": checkInTime.toLocaleTimeString('tr'),
          "checkOutTime": checkOutTime.toLocaleTimeString('tr'),
          "userId": ""
        }
      ]
    }



    userDocument.get().then(querySnapshot => {
      var myData = querySnapshot.docs.map(doc => {

        const parkSlotData = doc.data()
        var date = checkInDate.toLocaleDateString().split("/")
        var myCheckOutDate = date.join("-")
        const dataFromSlot = parkSlotData[myCheckOutDate] || 0;

        if (dataFromSlot === 0) {
          return "empty"
        }

        let checkArray = []
        for (let i = 0; i < dataFromSlot.length; i++) {
          if (
            (checkInTime.toLocaleTimeString('tr') < dataFromSlot[i]["checkInTime"] && checkOutTime.toLocaleTimeString('tr') < dataFromSlot[i]["checkInTime"]) || (checkInTime.toLocaleTimeString('tr') > dataFromSlot[i]["checkOutTime"] && checkOutTime.toLocaleTimeString('tr') > dataFromSlot[i]["checkOutTime"])) {
            checkArray.push("available")
          } else {
            checkArray.push("notAvailable")
          }
        }

        for (let i = 0; i < dataFromSlot.length; i++) {
          if (checkArray[i] === "notAvailable") {
            return "NotAvailable"
          }
        }


      })
      console.log(myData);
      let docNumberToChange = null

      for (let i = 0; i < myData.length; i++) {
        if (myData[i] === undefined) {
          docNumberToChange = i
          break
        }
        if (myData[i] === 'empty') {
          userDocument.doc(querySnapshot.docs[i].id)
            .set(bookDataIfNotSameTime, { merge: true }).then(() => { console.log("Document successfully written!") });
          break
        }
      }

      if (docNumberToChange !== null) {
        userDocument.doc(querySnapshot.docs[docNumberToChange].id).get().then(snap => {
          var date = checkInDate.toLocaleDateString().split("/")
          var myCheckOutDate = date.join("-")

          var okeyTime = snap.data()
          var times = okeyTime["10-8-2020"]
          var myNewTime = [...times]
          myNewTime.push(bookData)
          console.log(myNewTime);

          let mylastObject = {
            [myCheckOutDate]: myNewTime
          }

          userDocument.doc(snap.id)
            .set(mylastObject, { merge: true }).then(() => { console.log("Document successfully written!") });
        })
      } else {
        console.log("Not Available");
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
        bookedParkHistory: bookedParkHistory,

        onChangeCheckInTime: onChangeCheckInTime,
        onChangeCheckOutTime: onChangeCheckOutTime,
        onChangeCheckInDate: onChangeCheckInDate,
        checkInTime: checkInTime,
        checkOutTime: checkOutTime,
        checkInDate: checkInDate
      }}>
      {props.children}
    </FirebaseContext.Provider>
  )
};

export { FirebaseProvider, FirebaseContext }


// let docNumberToChange = null

//       for (let i = 0; i < myData.length; i++) {
//         if (myData[i] === "Available") {
//           docNumberToChange = i
//           break
//         }
//       }

//       if (docNumberToChange !== null) {
//         userDocument.doc(querySnapshot.docs[docNumberToChange].id)
//           .set(bookData).then(() => { console.log("Document successfully written!") });
//       } else {
//         console.log("Not Available");
//       }



        //   const parkSlotData = doc.data()
        //   const dataFromSlot = parkSlotData[`${checkInDate.toLocaleDateString()}`] || 0;
        //   console.log();
        //   for (let i = 0; i < dataFromSlot.length; i++) {
        //     if (
        //       (checkInTime.toLocaleTimeString('tr') <= dataFromSlot[i]["checkInTime"] && checkOutTime.toLocaleTimeString('tr') <= dataFromSlot[i]["checkInTime"]) || (checkInTime.toLocaleTimeString('tr') >= dataFromSlot[i]["checkOutTime"] && checkOutTime.toLocaleTimeString('tr') >= dataFromSlot[i]["checkOutTime"])) {
        //       return "Available"
        //     }
        //   }




      //   let bookData = {
      //     "6/10/2020": [
      //       {
      //         "checkInTime": checkInTime,
      //         "checkOutTime": checkOutTime,
      //         "userId": ""
      //       }
      //     ]
      //   }

      //   const userDocument = firestore().collection('car-parks').doc(parkId).collection('parking-slots')
      //   var date = checkInDate.toLocaleDateString().split("/")
      //   var myCheckOutDate = date.join("-")
      //   console.log(myCheckOutDate);
      //   userDocument.get().then(querySnapshot => {
      //     var myData = querySnapshot.docs.map(doc => {
      //       return doc.id
      //     })

      //     myData.map(doc => {
      //       userDocument.doc(doc).collection(myCheckOutDate).get().then(data => {
      //         var collectionId = data.docs.map(doc => {
      //           var dataFromSlot = doc.data()
      //           if (
      //             (checkInTime.toLocaleTimeString('tr') <= dataFromSlot["checkInTime"] && checkOutTime.toLocaleTimeString('tr') <= dataFromSlot["checkInTime"]) || (checkInTime.toLocaleTimeString('tr') >= dataFromSlot["checkOutTime"] && checkOutTime.toLocaleTimeString('tr') >= dataFromSlot["checkOutTime"])) {
      //             return doc.id
      //           }
      //         })
      //       })
      //     })

      //   }).catch(function (error) {
      //     console.log("Error getting document:", error);
      //   })
      // }