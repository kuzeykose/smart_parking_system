import React, { useContext, useState } from 'react';
import { UserContext } from '../../navigation/AuthProvider'
import imagePeople from '../../imagePeople.jpg'

import {
  UserInformationText,
  TopView,
  ImageView,
  Container,
  CarTextInput,
  CarInputView,
  InfoText,
  SaveButtonText,
  SaveButton,
  Middelof
} from './style'

import {
  SafeAreaView,
  Image,
  View
} from 'react-native';

import { FirebaseContext } from '../../provider/FirebaseProvider';

const EditProfile = () => {
  const value = useContext(FirebaseContext);
  const [editProfileName, setEditProfileName] = useState("")
  const [editProfileEmail, setEditProfileEmail] = useState("")

  return (
    <SafeAreaView>
      <Container>
        <Middelof>
          <TopView>
            <ImageView>
              <Image
                source={imagePeople}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 400 / 2,
                }}
              />
            </ImageView>
            <View>
              <UserInformationText>{value.userInformation.name}</UserInformationText>
              <UserInformationText>{value.userInformation.email}</UserInformationText>
            </View>
          </TopView>
          <CarInputView>
            <InfoText>Name</InfoText>
            <CarTextInput
              onChange={(text) => { setEditProfileName(text.nativeEvent.text) }}
            ></CarTextInput>
          </CarInputView>
          {/* <CarInputView>
            <InfoText>Email</InfoText>
            <CarTextInput
              onChange={(text) => { setEditProfileEmail(text.nativeEvent.text) }}
            ></CarTextInput>
          </CarInputView> */}
        </Middelof>

        <SaveButton onPress={() => {
          value.editProfile(editProfileName, editProfileEmail)
        }}>
          <SaveButtonText>
            Save
          </SaveButtonText>
        </SaveButton>

      </Container>
    </SafeAreaView >
  );
};

export default EditProfile;
