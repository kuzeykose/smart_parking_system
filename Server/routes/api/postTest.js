const express = require('express')
const router = express.Router()
const path = require('path');
const { admin } = require('../../firebaseConfig');
var moment = require('moment');

const db = admin.firestore();
router.get('/', (req, res) => {
  res.sendFile('deneme.html', { root: path.join(__dirname, '../') })
});

router.post('/post-deneme', (req, res) => {
  let date = moment().format("MM-DD-YYYY")
  let hours = moment().format("HH:mm")

  // console.log(req.body, date, hours);
  db.collection('rasp-data').doc(date).collection(hours).add({
    carbondioxide: req.body.carbondioxide,
    temperature: req.body.temperature,
    humidity: req.body.humidity,
    carbonmonoxide: req.body.carbonmonoxide,
    dust: req.body.dust,
    nitrogendioxide: req.body.nitrogendioxide
  })

  res.send('Kayıt edildi')
});

module.exports = router