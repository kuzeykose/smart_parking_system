const express = require('express')
const router = express.Router()
const { admin } = require('../../firebaseConfig')

const db = admin.firestore();

router.post('/save-car', (req, res) => {
  db.collection("users").doc(req.body.currentUserUid).collection("vehicles").add({
    name: req.body.name,
    licensePlate: req.body.licensePlate,
    brand: req.body.brand
  }).then(
    db.collection("users").doc(req.body.currentUserUid).collection("vehicles").get().then(el => {
      const vehicles = el.docs.map(el => {
        return el.data()
      })
      console.log(vehicles);
      res.send(vehicles)
    })
  )
});

router.post('/delete-car', (req, res) => {
  db.collection("users").doc(req.body.currentUserUid)
    .collection("vehicles").where("licensePlate", "==", req.body.carInfo.licensePlate).get()
    .then(querySnapshot => {
      querySnapshot.forEach(function (doc) {
        db.collection("users").doc(req.body.currentUserUid)
          .collection("vehicles").doc(doc.id).delete()
      })
    }).then(
      db.collection("users").doc(req.body.currentUserUid).collection("vehicles").get().then(el => {
        const vehicles = el.docs.map(el => {
          return el.data()
        })
        console.log(vehicles);
        res.send(vehicles)
      })
    )
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
});

module.exports = router