// const express = require('express')
// const router = express.Router()
// const { admin } = require('../../firebaseConfig')

// //get Brands of car in database
// const db = admin.firestore();
// router.get('/', (req, res) => {
//   const docRef = db.collection("car-models");
//   docRef
//     .get()
//     .then(doc => {
//       const documents = doc.docs.map(document => {
//         return { label: document.id, value: document.id }
//       })
//       res.send(documents)
//     })
// });

// router.post('/selected-car', (req, res) => {
//   res.send(req.body.selectedCarModel)

//   if (req.body.selectedCarModel === undefined) {
//     console.log("sorry");
//   } else {
//     const docRef = db.collection("car-models").doc(req.body.selectedCarModel)
//     docRef
//       .get()
//       .then(col => {

//       })
//   }

// });



// module.exports = router