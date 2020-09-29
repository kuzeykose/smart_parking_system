import React, { Component } from 'react'
import { Platform } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

export default class Search extends Component {
  render() {
    return (
      <GooglePlacesAutocomplete
        placeholder="Where do you want to park?"
        placeholderTextColor="#333"
        onPress={() => { }}
        query={{
          key: "AIzaSyAbE_uxNFwH3bHysGhNhWVhrGTHpsDHpxc",
          language: 'pt',
        }}
        textInputProps={{
          autoCapitalize: "none",
          autoCorrect: false
        }}
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
            paddingLeft: 0,
            paddingRight: 0,
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

          }
        }}
      />
    )
  }
}
