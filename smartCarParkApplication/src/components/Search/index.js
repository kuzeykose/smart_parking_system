import React, { Component, useState, useContext } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { FirebaseContext } from '../../provider/FirebaseProvider'
import { carParkNames } from '../../assets/carParkNames'

const bilgiUniversitySantral = {
  description: 'Bilgi University - Santral',
  geometry: { location: { lat: 41.0657524, lng: 28.946341 } },
  id: 'BilgiUniversitySantralCarPark'
};
const bilgiUniversityDolapdere = {
  description: 'Bilgi University - Dolapdere',
  geometry: { location: { lat: 41.038853, lng: 28.9737589999999 } },
  id: 'BilgiUniversityDolapdereCarPark'
};

const Search = () => {
  const firebaseContext = useContext(FirebaseContext);

  const searchCarPark = (text) => {
    firebaseContext.setSearchItem(text)
    const filteredCharacters = carParkNames.filter(character => {
      return (
        character.ParkAdi.toLowerCase().includes(text.toLowerCase()) ||
        character.Ilce.toLowerCase().includes(text.toLowerCase())
      )
    });
    console.log(filteredCharacters);
  }

  const listItem = () => {
    return <Text>
      Hello
    </Text>
  }

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholderTextColor="#333"
          style={styles.textInput}
          placeholder="Where do you want to park?"
          value={firebaseContext.searchItem}
          onChange={(text) => { searchCarPark(text.nativeEvent.text) }}
        />

      </View>
    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    position: 'absolute',
    top: Platform.select({ ios: 60, android: 40 }),
    width: '100%'
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    height: 54,
    marginHorizontal: 20,
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  textInput: {
    height: 54,
    margin: 0,
    borderRadius: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    padding: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { x: 0, y: 0 },
    shadowRadius: 15,
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#fffffe',
    fontSize: 18
  }
});

export default Search