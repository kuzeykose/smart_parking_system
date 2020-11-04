const express = require('express')
const router = express.Router()
const { admin } = require('../../firebaseConfig')

const db = admin.firestore();
router.post('/', (req, res) => {
  const docRef = db.collection("users");
  docRef
    .doc(req.body.currentUserUid)
    .collection("activeBookedPark")
    .get()
    .then(col => {
      const documents = col.docs.map(document => {
        return document.data()
      })
      res.send(documents);
    })
});

module.exports = router