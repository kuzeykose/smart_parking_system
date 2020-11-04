const express = require('express')
const router = express.Router()
const { admin } = require('../../firebaseConfig')
const checkAvailableStatus = require('../../firebaseHelpers/checkAvailableStatis')
const switchFormatTimeAndDate = require('../../firebaseHelpers/switchFormatTimeAndDate')
const { setDbBookDataArray, setDbBookDataArrayEmpty } = require('../../firebaseHelpers/setDbBookData')

const db = admin.firestore();

router.post('/', (req, res) => {
  // check all element in slotAvaliblity are they notAvailable?
  const notAvailableArray = arr => arr.every(v => v === "notAvailable")
  const bookDataInformation = switchFormatTimeAndDate(
    req.body.checkInDate,
    req.body.checkInTime,
    req.body.checkOutTime,
    req.body.currentUserUid,
    req.body.parkId,
    req.body.latitude,
    req.body.longitude
  )


  // database selected park collection 
  const parkSlotsCollection = db
    .collection('car-parks')
    .doc(bookDataInformation.parkId)
    .collection('parking-slots')

  parkSlotsCollection.get().then(querySnapshot => {
    // get documnet in firebase, slotAcaliblity -> empty/ available/notAvailable
    var slotAvaliblity = querySnapshot.docs.map(doc => {
      return checkAvailableStatus(
        doc,
        bookDataInformation.checkInTime,
        bookDataInformation.checkOutTime,
        bookDataInformation.checkInDate
      )
    })

    for (let index = 0; index < slotAvaliblity.length; index++) {
      if (slotAvaliblity[index] === undefined) {
        setDbBookDataArray(
          db,
          parkSlotsCollection,
          bookDataInformation.checkInDate,
          bookDataInformation.checkInTime,
          bookDataInformation.checkOutTime,
          bookDataInformation.currentUserUid,
          bookDataInformation.latitude,
          bookDataInformation.longitude,
          index,
          querySnapshot
        )
        res.send("completed")
        break
      } else if (slotAvaliblity[index] === 'empty') {
        setDbBookDataArrayEmpty(
          db,
          parkSlotsCollection,
          bookDataInformation.checkInDate,
          bookDataInformation.checkInTime,
          bookDataInformation.checkOutTime,
          bookDataInformation.currentUserUid,
          bookDataInformation.latitude,
          bookDataInformation.longitude,
          index,
          querySnapshot
        )
        res.send("completed")
        break
      }
    }

    if (notAvailableArray(slotAvaliblity)) {
      console.log("sorry no available");
      res.send("slotsAreNotAvailable")
    }

  }).catch(error => {
    console.log("Error getting document:", error);
  })
});

module.exports = router