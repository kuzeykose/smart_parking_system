// const express = require('express')
// const app = express()
// const port = 3000


const admin = require('firebase-admin');
const serviceAccount = require('./service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


// GET 
function getDataFirestore() {

  try {
    //firestore üzerinde dota/heroes pathini referans alıyor
    const docRef = db.collection("car-parks");

    docRef.doc("BilgiUniversitySantralCarPark").collection("parking-slots").doc("A01").get().then((data) => {
      if (data && data.exists) {
        const responseData = data.data();
        console.log(JSON.stringify(responseData, null, ""));
      }
    })
  } catch (error) { }

}

getDataFirestore();





// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })