const { v4: uuidv4 } = require('uuid');
function setDbBookDataArray(
  db,
  coll,
  parkId,
  checkInDate,
  checkInTime,
  checkOutTime,
  currentUserUid,
  latitude,
  longitude,
  index,
  snapShot) {


  const docId = uuidv4()
  let activeDoc = { // for user active data  
    "checkInDate": checkInDate,
    "checkInTime": checkInTime,
    "checkOutTime": checkOutTime,
    "userId": currentUserUid,
    "latitude": latitude,
    "longitude": longitude,
    "parkId": parkId,
    "parkSlot": snapShot.docs[index].id,
    "docId": docId
  }


  let bookData = { // available or notAvailable uses
    "checkInTime": checkInTime,
    "checkOutTime": checkOutTime,
    "userId": currentUserUid
  }

  coll.doc(snapShot.docs[index].id).get().then(snap => {
    const availableSlot = snap.data()
    const times = availableSlot[checkInDate]
    let myNewTimes = [...times]
    myNewTimes.push(bookData)

    let myLastObject = {
      [checkInDate]: myNewTimes
    }

    coll
      .doc(snap.id)
      .set(myLastObject, { merge: true }).then(() => {
        console.log("Document successfully written!")
      })

    db.collection('users').doc(`${currentUserUid}`).collection('activeBookedPark').doc(docId).set(activeDoc)
  })
}

// 
function setDbBookDataArrayEmpty(
  db,
  coll,
  parkId,
  checkInDate,
  checkInTime,
  checkOutTime,
  currentUserUid,
  latitude,
  longitude,
  index,
  snapShot) {
  const docId = uuidv4()

  let activeDoc = { // for user active data  
    "parkId": parkId,
    "checkInDate": checkInDate,
    "checkInTime": checkInTime,
    "checkOutTime": checkOutTime,
    "userId": currentUserUid,
    "latitude": latitude,
    "longitude": longitude,
    "parkSlot": snapShot.docs[index].id,
    "docId": docId
  }


  let bookDataIfNotSameTime = { // empty uses because creating date at the same time
    [checkInDate]: [
      {
        "checkInTime": checkInTime,
        "checkOutTime": checkOutTime,
        "userId": currentUserUid
      }
    ]
  }

  coll
    .doc(snapShot.docs[index].id)
    .set(bookDataIfNotSameTime, { merge: true }).then(() => {
      console.log("Document successfully written!")
    })

  db.collection('users').doc(`${currentUserUid}`).collection('activeBookedPark').doc(docId).set(activeDoc)
}

module.exports = {
  setDbBookDataArray,
  setDbBookDataArrayEmpty
}