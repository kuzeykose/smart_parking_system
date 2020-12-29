const express = require('express')
const router = express.Router()
const { admin } = require('../../firebaseConfig')

const db = admin.firestore();

router.post('/add-bank-card', (req, res) => {
  console.log(req.body);

  db.collection("users").doc(req.body.currentUserUid).collection("paymentInformation").add({
    nameSurname: req.body.nameSurname,
    cardNumber: req.body.cardNumber,
    expirationDate: req.body.expirationDate,
    CVV: req.body.CVV,
  }).then(
    db.collection("users").doc(req.body.currentUserUid).collection("paymentInformation").get().then(el => {
      const paymentMethods = el.docs.map(el => {
        return el.data()
      })
      console.log(paymentMethods);
      res.send(paymentMethods)
    })
  )
});

router.post('/delete-bank-card', (req, res) => {
  console.log(req.body);

  db.collection("users").doc(req.body.currentUserUid).collection("paymentInformation").where("cardNumber", "==", String(req.body.cardNumber)).get()
    .then(querySnapshot => {
      querySnapshot.forEach(function (doc) {
        db.collection("users").doc(req.body.currentUserUid)
          .collection("paymentInformation").doc(doc.id).delete()
      })
    }).then(
      db.collection("users").doc(req.body.currentUserUid).collection("paymentInformation").get().then(el => {
        const paymentMethods = el.docs.map(el => {
          return el.data()
        })
        console.log(paymentMethods);
        res.send(paymentMethods)
      })
    )
});


module.exports = router