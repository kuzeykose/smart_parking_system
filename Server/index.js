const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors());
app.use(express.json())

const port = 3000

const admin = require('firebase-admin');
const serviceAccount = require('./service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/A01', (req, res) => {
  const docRef = db.collection("car-parks");
  docRef.doc("BilgiUniversitySantralCarPark").collection("parking-slots").doc("A01").get().then((data) => {
    if (data && data.exists) {
      const responseData = data.data();
      res.send(JSON.stringify(responseData, null, "  "));
    }
  })
});

app.post('/user', (req, res) => {
  const docRef = db.collection("users");
  docRef.doc(req.body.currentUserUid).get().then((data) => {
    if (data && data.exists) {
      const responseData = data.data();
      res.send(JSON.stringify(responseData, null, "  "));
    }
  })
});

app.post('/user/ticket', (req, res) => {
  const docRef = db.collection("users");
  docRef.doc(req.body.currentUserUid).collection("bookedParkHistory").get().then(objects => {
    var mydata = objects.docs.map(object => {
      return object.data()
    })
    res.send(JSON.stringify(mydata, null, "  "));
  })
});


// app.post('/A01firebase', (req, res) => {
//   //firestore post
//   const jsonFile = fs.readFileSync('./heroes.json') //reads from local
//   const heroes = JSON.parse(jsonFile); //json parse 

//   return db.collection('dota').doc('heroes')
//     .set(heroes).then(() => {
//       res.send("Fresh Meat!!")
//     });
// })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})