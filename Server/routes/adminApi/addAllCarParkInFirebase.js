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

    const parkDataForSearching = kapaliAndAcikCarPark.map(item => {
      console.log(item);
      const parkObject = {
        ParkName: item.ParkAdi,
        District: item.Ilce,
      }
      return parkObject
    })

    const parkData = kapaliAndAcikCarPark.map(item => {
      axios.get(`https://api.ibb.gov.tr/ispark/ParkDetay?id=${item.ParkID}`).then(resp => {
        const parkInformation = resp.data
        const parkObject = {
          ParkID: parkInformation.ParkID,
          ParkName: parkInformation.ParkAdi,
          Latitude: parkInformation.Latitude,
          Longitude: parkInformation.Longitude,
          Capacity: parkInformation.Kapasitesi,
          ParkType: parkInformation.ParkTipi,
          District: parkInformation.Ilce,
          PriceList: parkInformation.Tarifeler,
          Address: parkInformation.Adres
        }
        console.log(parkObject);
      })
      //   db.collection('car-parks').doc(parkInformation.ParkAdi).set(parkObject);
      //   for (let i = 0; i < 5; i++) {
      //     db.collection('car-parks')
      //       .doc(item.ParkAdi)
      //       .collection("parking-slots")
      //       .doc(`${i}`)
      //       .set({})
      //   }

    })
    res.send(parkDataForSearching);
  });
})


module.exports = router