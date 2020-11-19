const express = require('express')
const router = express.Router()
const { admin } = require('../../firebaseConfig')
const checkAvailableStatus = require('../../firebaseHelpers/checkAvailableStatus')
const switchFormatTimeAndDate = require('../../firebaseHelpers/switchFormatTimeAndDate')
const { setDbBookDataArray, setDbBookDataArrayEmpty } = require('../../firebaseHelpers/setDbBookData')

const db = admin.firestore();

router.post('/bookslot', (req, res) => {
  const bookData = req.body

  // check all element in slotAvaliblity are they notAvailable?
  const notAvailableArray = arr => arr.every(v => v === "notAvailable")

  const bookDataInformation = switchFormatTimeAndDate(bookData)

  // database -> selected park collection 
  const parkSlotsCollection = db
    .collection('car-parks')
    .doc(bookDataInformation.parkId)
    .collection('parking-slots')

  parkSlotsCollection.get().then(querySnapshot => {
    // get documnet in firebase, slotAvailability -> empty/ available/ notAvailable

    var slotAvaliblity = querySnapshot.docs.map(doc => {
      return checkAvailableStatus(doc, bookDataInformation)
    })

    for (let index = 0; index < slotAvaliblity.length; index++) {
      if (slotAvaliblity[index] === undefined) {
        setDbBookDataArray(
          db,
          parkSlotsCollection,
          bookDataInformation,
          index,
          querySnapshot
        )
        res.send("completed")
        break
      } else if (slotAvaliblity[index] === 'empty') {
        setDbBookDataArrayEmpty(
          db,
          parkSlotsCollection,
          bookDataInformation,
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