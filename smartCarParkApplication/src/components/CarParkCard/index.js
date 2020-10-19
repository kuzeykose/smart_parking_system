import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
} from 'react-native';

const CarParkCard = () => {
  return (
    <View style={styles.container}>
      <Text>Near park areas</Text>
      <Image
        style={styles.logo}
        source={{
          uri:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
        }} />
      <Text style={styles.card}>Lorem ipsum dolor sit amet ,consectetur adipiscing elit</Text>
      <Text>Price</Text>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    height: 225,
    width: 360,
    backgroundColor: '#FEFEFE',
    marginBottom: 20,
    borderRadius: 20,
    borderColor: 'gray',
    borderWidth: 1,
  },
  logo: {
    width: 66,
    height: 58,
  },
  card: {
    backgroundColor: 'blue'
  }
})

export default CarParkCard;
