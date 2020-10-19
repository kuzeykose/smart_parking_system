import React, { Component } from 'react'
import { Platform } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

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

export default class Search extends Component {
  state = {
    searchFocused: false
  }

  render() {
    const { onLocationSelected } = this.props
    const { searchFocused } = this.props

    return (
      <GooglePlacesAutocomplete
        placeholder="Where do you want to park?"
        placeholderTextColor="#333"
        onPress={onLocationSelected}
        query={{
          key: "AIzaSyAbE_uxNFwH3bHysGhNhWVhrGTHpsDHpxc",
          language: 'en',
          types: 'Bilgi'
        }}
        textInputProps={{
          onFocus: () => { this.setState({ searchFocused: true }) },
          onBlur: () => { this.setState({ searchFocused: false }) },
          autoCapitalize: "none",
          autoCorrect: false
        }}
        predefinedPlaces={[bilgiUniversitySantral, bilgiUniversityDolapdere]}
        listViewDisplayed={searchFocused}
        fetchDetails
        enablePoweredByContainer={false}
        styles={{
          container: {
            position: 'absolute',
            top: Platform.select({ ios: 60 }),
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
            fontSize: 18
          },
          listView: {
            borderWidth: 1,
            borderColor: '#DDD',
            backgroundColor: '#FFF',
            marginHorizontal: 20,
            elevation: 5,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { x: 0, y: 0 },
            shadowRadius: 15,
            marginTop: 10,
          },
          description: {
            fontSize: 16
          },
          row: {
            padding: 20,
            height: 58
          }
        }}
      />
    )
  }
}
