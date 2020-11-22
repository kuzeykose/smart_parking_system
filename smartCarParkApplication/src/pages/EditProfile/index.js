import React, { useContext } from 'react';
import { UserContext } from '../../navigation/AuthProvider'
import imagePeople from '../../imagePeople.jpg'

import {
  UpdateButton,
  UpdateButtonText,
  UserInformationText,
  TopView,
  Input,
  InformationCard
} from './style'

import {
  SafeAreaView,
  Image,
  View
} from 'react-native';

import { FirebaseContext } from '../../provider/FirebaseProvider';

const EditProfile = () => {
  const value = useContext(FirebaseContext);
  return (
    <SafeAreaView>
      <TopView>
        <Image
          source={imagePeople}
          style={{
            width: 125,
            height: 125,
            borderRadius: 400 / 2,
          }}
        />
      </TopView>
      <InformationCard>
        <UserInformationText>Name:</UserInformationText>
        <Input
          placeholder={value.userInformation.name}
          value={value.editProfileName}
          onChange={(text) => value.setEditProfileName(text)}
        />
      </InformationCard>
      <InformationCard>
        <UserInformationText>Email:</UserInformationText>
        <UserInformationText>{value.userInformation.email}</UserInformationText>
      </InformationCard>
      <View style={{ marginLeft: 10 }}>
        <UpdateButton title={"update"} onPress={() => { }}>
          <UpdateButtonText>Update</UpdateButtonText>
        </UpdateButton>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
