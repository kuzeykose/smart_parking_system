import firestore from '@react-native-firebase/firestore';

function writeArrayBookData(userDocument, myCheckOutDate, checkInTime, checkOutTime, currentUserUid, docNumberToChange, querySnapshot) {
  let activeDoc = { // for user active data
    "parkSlot": "",
    "parkName": "",
    "parkId": "",
    "checkInDate": myCheckOutDate,
    "checkInTime": checkInTime.toLocaleTimeString('tr'),
    "checkOutTime": checkOutTime.toLocaleTimeString('tr'),
    "userId": currentUserUid
  }

  let bookData = { // available or notAvailable uses
    "checkInTime": checkInTime.toLocaleTimeString('tr'),
    "checkOutTime": checkOutTime.toLocaleTimeString('tr'),
    "userId": currentUserUid
  }

  //parking slot doc
  userDocument.doc(querySnapshot.docs[docNumberToChange].id).get().then(snap => {
    var okeyTime = snap.data() //get document
    var times = okeyTime[myCheckOutDate] // get array which date 
    var myNewTime = [...times] // copy array
    myNewTime.push(bookData) // push inside the checkIn checkOut

    let mylastObject = { //write in object
      [myCheckOutDate]: myNewTime
    }

    userDocument.doc(snap.id) // write firebase
      .set(mylastObject, { merge: true }).then(() => { console.log("Document successfully written!") });

    //user doc
    firestore().collection('users').doc(`${currentUserUid}`).collection('activeBookedPark').add(activeDoc)
  })

}

export { writeArrayBookData }


