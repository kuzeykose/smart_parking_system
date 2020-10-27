const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 3000

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Connection done!')
})

// users api member
app.use('/api/user', require('./routes/api/users'))





// app.get('/A01', (req, res) => {
//   const docRef = db.collection("car-parks");
//   docRef.doc("BilgiUniversitySantralCarPark").collection("parking-slots").doc("A01").get().then((data) => {
//     if (data && data.exists) {
//       const responseData = data.data();
//       res.send(JSON.stringify(responseData, null, "  "));
//     }
//   })
// });



// app.post('/user/ticket', (req, res) => {
//   const docRef = db.collection("users");
//   docRef.doc(req.body.currentUserUid).collection("bookedParkHistory").get().then(objects => {
//     var mydata = objects.docs.map(object => {
//       return object.data()
//     })
//     res.send(JSON.stringify(mydata, null, "  "));
//   })
// });




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