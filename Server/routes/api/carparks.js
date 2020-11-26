const express = require('express')
const router = express.Router()

const { admin } = require('../../firebaseConfig')
const db = admin.firestore();

router.post('/', (req, res) => {
  console.log(req.body.searchItem);
  const docRef = db.collection("car-parks").doc(req.body.searchItem).get()

  docRef.then(data => {
    res.send(data.data());
  })

});

module.exports = router