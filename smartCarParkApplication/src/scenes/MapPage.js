import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Map from '../components/Map'

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
