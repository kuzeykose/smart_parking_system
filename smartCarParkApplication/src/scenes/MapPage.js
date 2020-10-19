import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import Map from '../components/Map'
import CarParkCard from '../components/CarParkCard'
import SearchBar from '../components/SearchBar'


const Homepage = () => {

  return (
    <SafeAreaView style={styles.container}>
      <Map />
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default Homepage;
