import React from 'react';
import { UserContext } from '../navigation/AuthProvider'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Settingspage = () => {
  return (
    <UserContext.Consumer>
      {user =>
        <SafeAreaView>
          <View>
            <Button title={"logout"} onPress={user.logOut} />
          </View>
        </SafeAreaView>
      }
    </UserContext.Consumer>


  );
};

export default Settingspage;
