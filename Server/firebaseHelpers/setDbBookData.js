// 
function setDbBookDataArray(
  db,
  coll,
  checkInDate,
  checkInTime,
  checkOutTime,
  currentUserUid,
  index,
  snapShot) {

  let activeDoc = { // for user active data  
    "checkInDate": checkInDate,
    "checkInTime": checkInTime,
    "checkOutTime": checkOutTime,
    "userId": currentUserUid
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

    db.collection('users').doc(`${currentUserUid}`).collection('activeBookedPark').add(activeDoc)
  })
}

// 
function setDbBookDataArrayEmpty(
  db,
  coll,
  checkInDate,
  checkInTime,
  checkOutTime,
  currentUserUid,
  index,
  snapShot) {

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

  db.collection('users').doc(`${currentUserUid}`).collection('activeBookedPark').add(activeDoc)
}

module.exports = {
  setDbBookDataArray,
  setDbBookDataArrayEmpty
}


