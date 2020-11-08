const express = require('express')
const router = express.Router()
const { admin } = require('../../firebaseConfig')
const sendEmailVerification = require('../../firebaseHelpers/sendEmailVerification')

const db = admin.firestore();

// send user information
router.post('/', (req, res) => {

  const docRef = db.collection("users");
  docRef.doc(req.body.currentUserUid).get().then((data) => {

    const responseData = data.data();

    data.ref.collection("activeBookedPark").get().then(element => {
      active = element.docs.map(el => {
        return el.data()
      })
      data.ref.collection("historyBookedPark").get().then(element => {
        var history = element.docs.map(el => {
          return el.data()
        })
        res.send({
          active: active,
          history: history,
          information: responseData
        });
      })
    })
  })
});

// Register -> {name, licencePlate, email, userUid}
router.post('/register', (req, res) => {
  const actionCodeSettings = {
    url: 'http://localhost:3000',
    handleCodeInApp: false
  };

  admin.auth().createUser({
    email: req.body.email,
    password: req.body.password,
  })
    .then(cred => {
      const userUid = cred.uid
      const docRef = db.collection('users').doc(userUid);
      docRef.set({
        name: req.body.fullName,
        licensePlate: req.body.licensePlate,
        email: req.body.email,
        userUid: userUid
      });

      admin.auth()
        .generateEmailVerificationLink(cred.email, actionCodeSettings)
        .then(link => {
          sendEmailVerification(cred.email, link)
        })
      res.send("userCreated")

    })
    .catch(error => {
      if (error.code === 'auth/email-already-exists') {
        console.log('That email address is already in use!');
        res.send('That email address is already in use!')
      }
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        res.send('That email address is invalid!')
      }
      res.send(error);
    });
})

module.exports = router