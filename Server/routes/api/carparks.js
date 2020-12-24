const express = require('express')
const router = express.Router()
const { Client } = require("@googlemaps/google-maps-services-js");
const GOOGLE_MAPS_API_KEY = "AIzaSyAbE_uxNFwH3bHysGhNhWVhrGTHpsDHpxc"

const { admin } = require('../../firebaseConfig')
const db = admin.firestore();

const client = new Client({});

router.post('/', (req, res) => {
  console.log(req.body);
  if (req.body.searchItem !== "") {

    const docRef = db.collection("car-parks").doc(req.body.searchItem).get()
    docRef.then(data => {
      // console.log(data.data())

      const lat = parseFloat(data.data().Latitude)
      const lng = parseFloat(data.data().Longitude)

      client
        .reverseGeocode({
          params: {
            latlng: [lat, lng],
            key: GOOGLE_MAPS_API_KEY,
          },
          timeout: 1000, // milliseconds
        })
        .then((r) => {
          client.textSearch({
            params: {
              query: data.data().ParkName,
              key: GOOGLE_MAPS_API_KEY,
            },
            timeout: 1000, // milliseconds
          }).then((t) => {
            const dataRetype = {
              parkId: data.data().ParkID,
              kapasite: data.data().Kapasitesi,
              ilce: data.data().Ilce,
              latitude: parseFloat(data.data().Latitude),
              parkName: data.data().ParkName,
              longitude: parseFloat(data.data().Longitude),
              address: r.data.results[0].address_components[2].long_name
                + ', ' + r.data.results[0].address_components[1].long_name
                + ', ' + 'No: ' + r.data.results[0].address_components[0].long_name,
              rating: t.data.results[0].rating
            }
            res.send(dataRetype)
          })
          // console.log(r.data.results);
        })
        .catch((e) => {
          console.log(e.response.data.error_message);
        });

      // console.log(data.data());

    })
  } else {
    console.log("gecersiz");
  }



});



module.exports = router