const express = require('express')
const router = express.Router()
const { admin } = require('../../firebaseConfig')
const checkAvailableStatus = require('../../firebaseHelpers/checkAvailableStatus')
const switchFormatTimeAndDate = require('../../firebaseHelpers/switchFormatTimeAndDate')
const { setDbBookDataArray, setDbBookDataArrayEmpty } = require('../../firebaseHelpers/setDbBookData')

const db = admin.firestore();

router.post('/bookslot', (req, res) => {
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
          bookDataInformation.parkId,
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
          bookDataInformation.parkId,
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


router.post('/bookcancelation', (req, res) => {

  const parkSlotsCollection = db
    .collection('car-parks')
    .doc(req.body.parkId)
    .collection('parking-slots')
    .doc(req.body.parkSlot)

  parkSlotsCollection.get()
    .then(snap => {
      const slotData = snap.data()

      let myNewTimes = [...slotData[req.body.checkInDateTicket]]

      let myLastObject = {
        [req.body.checkInDateTicket]: myNewTimes
      }

      const dateToDelete = slotData[req.body.checkInDateTicket]

      for (let i = 0; i < dateToDelete.length; i++) {
        if (dateToDelete[i].userId === req.body.currentUserUid) {
          myNewTimes.splice(i, 1)
          console.log(myNewTimes);
        } else {
          console.log("error");
        }
      }

      parkSlotsCollection.set(myLastObject, { merge: true }).then(() => {
        console.log("Document successfully deleted!")
      })

      db.collection('users').doc(req.body.currentUserUid).collection('activeBookedPark').doc(req.body.docId).delete().then(() => {
        res.send("success delete")
      })
    })


})


module.exports = router