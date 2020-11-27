import React, { useContext } from 'react'
import { View, Button } from 'react-native'
import { FirebaseContext } from '../../provider/FirebaseProvider'


const SearchItem = (props) => {
  const firebaseContext = useContext(FirebaseContext);

  return (
    <View>
      <Button
        title={props.parkInformation.ParkAdi}
        onPress={() => {
          firebaseContext.setSearchItem(props.parkInformation.ParkAdi)
        }} />
    </View>
  );
}



export default SearchItem