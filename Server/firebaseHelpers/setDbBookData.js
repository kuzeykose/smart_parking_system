const { v4: uuidv4 } = require('uuid');

function setDbBookDataArray(db, coll, bookDataInformation, index, snapShot) {
  const docId = uuidv4() // uniq id for active book document id name

  let activeDoc = { // for user active data  
    "checkInDate": bookDataInformation.checkInDate,
    "checkInTime": bookDataInformation.checkInTime,
    "checkOutTime": bookDataInformation.checkOutTime,
    "userId": bookDataInformation.currentUserUid,
    "latitude": bookDataInformation.latitude,
    "longitude": bookDataInformation.longitude,
    "parkId": bookDataInformation.parkId,
    "parkSlot": snapShot.docs[index].id,
    "docId": docId
  }

  let bookData = { // available or notAvailable uses
    "checkInTime": bookDataInformation.checkInTime,
    "checkOutTime": bookDataInformation.checkOutTime,
    "userId": bookDataInformation.currentUserUid
  }

  coll.doc(snapShot.docs[index].id).get().then(snap => {
    const availableSlot = snap.data()
    const times = availableSlot[bookDataInformation.checkInDate]
    let myNewTimes = [...times]
    myNewTimes.push(bookData)

    let myLastObject = {
      [bookDataInformation.checkInDate]: myNewTimes
    }

    coll
      .doc(snap.id)
      .set(myLastObject, { merge: true }).then(() => {
        console.log("Document successfully written!")
      })

    db.collection('users').doc(`${bookDataInformation.currentUserUid}`).collection('activeBookedPark').doc(docId).set(activeDoc)
  })
}

// 
function setDbBookDataArrayEmpty(
  db,
  coll,
  bookDataInformation,
  index,
  snapShot) {
  const docId = uuidv4()

  let activeDoc = { // for user active data  
    "parkId": bookDataInformation.parkId,
    "checkInDate": bookDataInformation.checkInDate,
    "checkInTime": bookDataInformation.checkInTime,
    "checkOutTime": bookDataInformation.checkOutTime,
    "userId": bookDataInformation.currentUserUid,
    "latitude": bookDataInformation.latitude,
    "longitude": bookDataInformation.longitude,
    "parkSlot": snapShot.docs[index].id,
    "docId": docId
  }


  let bookDataIfNotSameTime = { // empty uses because creating date at the same time
    [bookDataInformation.checkInDate]: [
      {
        "checkInTime": bookDataInformation.checkInTime,
        "checkOutTime": bookDataInformation.checkOutTime,
        "userId": bookDataInformation.currentUserUid
      }
    ]
  }

  coll
    .doc(snapShot.docs[index].id)
    .set(bookDataIfNotSameTime, { merge: true }).then(() => {
      console.log("Document successfully written!")
    })

  db.collection('users').doc(`${bookDataInformation.currentUserUid}`).collection('activeBookedPark').doc(docId).set(activeDoc)
}


module.exports = {
  setDbBookDataArray,
  setDbBookDataArrayEmpty
}