const express = require('express')
const router = express.Router()
const admin = require('firebase-admin');
const serviceAccount = require('../../service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true })

router.post('/', (req, res) => {
  const docRef = db.collection("users");
  docRef.doc(req.body.currentUserUid).get().then((data) => {
    if (data && data.exists) {
      const responseData = data.data();
      res.send(JSON.stringify(responseData, null, "  "));
    }
  })
});

router.get('/', (req, res) => {
  const docRef = db.collection("users");
  docRef.get().then(querySnapshot => {
    const data = querySnapshot.docs.map(allData => {
      return allData.data()
    })
    res.send(data)
  })
});

// Register -> {name, licencePlate, email, userUid}
router.post('/register', (req, res) => {
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