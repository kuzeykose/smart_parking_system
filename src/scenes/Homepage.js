import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Animated,
  Easing,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; //PROVIDER_DEFAULT uses Apple's map
import Geolocation from '@react-native-community/geolocation';

const Homepage = () => {

  const [coord, setCoord] = useState();
  const [myLocation, setMyLocation] = useState();
  const [value, onChangeText] = React.useState('');
  const [growValue] = useState(new Animated.Value(0));


  const grow = growValue.interpolate({
    inputRange: [0, 4],
    outputRange: ['1', '4'],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(growValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [growValue]);

  Geolocation.getCurrentPosition(
    (c) =>
      setMyLocation({
        latitude: c.coords.latitude,
        longitude: c.coords.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003
      }),
    (error) => console.log(error),
    {
      enableHighAccuracy: true,
    },
  );

  Geolocation.watchPosition(
    (position) => {
      setCoord(position.coords);
    },
    (error) => {
      console.log(error);
    },
  );



  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          initialRegion={myLocation}>
          {myLocation !== undefined &&
            <Marker coordinate={myLocation} anchor={{ x: 0.5, y: 0.5 }}>
              <View
                style={{
                  width: 100,
                  height: 100,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <Animated.View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 10,
                    borderColor: '#000000',
                    borderWidth: 0.5,
                    transform: [{ scale: grow }],
                    backgroundColor: '#1976d299'
                  }}
                />
              </View>
            </Marker>
          }


          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 36 }}>Hello,</Text>
            <Text style={{ fontSize: 20 }}>Where are you want to parking?</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => onChangeText(text)}
              value={value}
            />
          </View>

        </MapView>
      </View>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    height: 50,
    width: 300,
    backgroundColor: '#FEFEFE',
    borderRadius: 40,
    borderColor: 'gray',
    borderWidth: 1,

    shadowColor: "black",
    textAlign: 'center'
  }
})

export default Homepage;
