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
      res.send(vehicles)
    })
  )
});


module.exports = router