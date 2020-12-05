/* 
using https://api.ibb.gov.tr/ispark/Park get all park data 
and filter acik(outdoor) or kapali(indoor) car park.
Then set the object specific items with new object.
Set database car-parks collection with document name which is item.ParkAdi 
*/
const express = require('express')
const router = express.Router()
const { admin } = require('../../firebaseConfig')
const axios = require('axios');

const db = admin.firestore();

router.get('/setDatabaseAllParkFromIspark', (req, res) => {

  axios.get('https://api.ibb.gov.tr/ispark/Park').then(resp => {
    const arr = resp.data
    const kapaliAndAcikCarPark = arr.filter(item => {
      if (item.ParkTipi == "KAPALI OTOPARK") {
        return true
      } else if (item.ParkTipi == "AÇIK OTOPARK") {
        return true
      } else {
        return false
      }
    })
    const parkData = kapaliAndAcikCarPark.map(item => {
      const parkObject = {
        ParkID: item.ParkID,
        ParkAdi: item.ParkAdi,
        Latitude: item.Latitude,
        Longitude: item.Longitude,
        Kapasitesi: item.Kapasitesi,
        ParkTipi: item.ParkTipi,
        Ilce: item.Ilce,
      }
      // db.collection('car-parks').doc(item.ParkAdi).set(parkObject);
      // for (let i = 0; i < 5; i++) {
      //   db.collection('car-parks')
      //     .doc(item.ParkAdi)
      //     .collection("parking-slots")
      //     .doc(`${i}`)
      //     .set({})
      // }
      return parkObject
    })
    res.send(parkData);
  });

})


module.exports = router