import React from 'react';
import {
  StyleSheet,
  TextInput,
} from 'react-native';


const SearchBar = (props) => {
  return (
    <TextInput
      style={styles.textInput}
      onChangeText={text => props.searchCarParkValueText(text)}
      value={props.searchCarParkValue}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    zIndex: 1,
    height: 50,
    width: 350,
    backgroundColor: '#FEFEFE',
    borderRadius: 20,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 100,
    shadowColor: "black",
    fontSize: 20,
    paddingLeft: 10
  }
})

export default SearchBar;
