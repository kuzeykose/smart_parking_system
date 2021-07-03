const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 3000
const axios = require('axios');
const bodyParser = require('body-parser');

const { admin } = require('./firebaseConfig');
const db = admin.firestore();

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', async (req, res) => {
  res.send('connection done!')
})

app.use('/api/user', require('./routes/api/users'))
app.use('/api/book', require('./routes/api/books'))
app.use('/api/ticket', require('./routes/api/tickets'))
app.use('/api/carpark', require('./routes/api/carparks'))
app.use('/api/car', require('./routes/api/cars'))
app.use('/api/paymentMethod', require('./routes/api/paymentMethods'))
app.use('/api/post-test', require('./routes/api/postTest'))

app.use('/admin-api/carparks', require('./routes/adminApi/addAllCarParkInFirebase'))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})