import React, { Component, useEffect, useState, useContext } from 'react'
import { View, Text, Button, TextInput, StyleSheet, ScrollView, FlatList } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { FirebaseContext } from '../../provider/FirebaseProvider'
import { carParkNames } from '../../assets/carParkNames'
import SearchItems from '../../components/SearchItem'

const Search = () => {
  const [searchText, setSearchText] = useState("")
  const [searchItems, setSearchItems] = useState(null)
  const firebaseContext = useContext(FirebaseContext);

  useEffect(() => {
    const filteredCharacters = carParkNames.filter(character => {
      return (
        character.ParkName.toLowerCase().includes(searchText.toLowerCase()) ||
        character.District.toLowerCase().includes(searchText.toLowerCase())
      )
    });
    if (searchText === "") {
      setSearchItems(null)
    } else {
      setSearchItems(filteredCharacters)
    }
  }, [searchText])

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholderTextColor="#fff"
          style={styles.textInput}
          placeholder="Where do you want to park?"
          value={searchText}
          onChange={(text) => { setSearchText(text.nativeEvent.text) }}
        />
        {searchItems &&
          <View style={{ height: 300, marginTop: 15 }}>
            <FlatList
              data={searchItems}
              keyboardShouldPersistTaps={"handled"}
              renderItem={({ item, index }) => <SearchItems parkInformation={item} key={index} firebaseContext={firebaseContext} />}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    position: 'absolute',
    top: Platform.select({ ios: 100, android: 80 }),
    width: '100%',
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    height: 54,
    marginHorizontal: 20,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    opacity: 0.85,
  },
  textInput: {
    color: 'white',
    height: 54,
    margin: 0,
    borderRadius: 30,
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
    backgroundColor: '#151338',
    fontSize: 18,
  }
});

export default Search