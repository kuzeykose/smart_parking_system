import React, { useContext, useState } from 'react';

import {
  Container,
  PasswordInput,
  PasswordView,
  PasswordText,
  ChangeButton,
  ChangeButtonText,
  MailText,
  UpdateEmailPassword,
  SendEmailChangePassword
} from './style'

import {
  SafeAreaView
} from 'react-native';

import { FirebaseContext } from '../../provider/FirebaseProvider';

const ChangePassword = () => {
  // const [currentPassword, setCurrentPassword] = useState("")
  // const [newPassword, setNewPassword] = useState("")
  // const [newPasswordVerify, setNewPasswordVerify] = useState("")

  // const IsPasswordSame = () => {
  //   if (newPassword === newPasswordVerify) {
  //     value.changePassword(currentPassword, newPassword)
  //     console.log("sended");
  //   } else {
  //     console.log("not equal");
  //   }
  // }

  const value = useContext(FirebaseContext);
  return (
    <SafeAreaView>
      <Container>
        {/* <UpdateEmailPassword>
          <PasswordView>
            <PasswordText >Current password</PasswordText>
            <PasswordInput
              secureTextEntry
              onChange={(text) => { setCurrentPassword(text.nativeEvent.text) }}
            ></PasswordInput>
          </PasswordView>
          <PasswordView>
            <PasswordText>New password</PasswordText>
            <PasswordInput
              secureTextEntry
              onChange={(text) => { setNewPassword(text.nativeEvent.text) }}
            ></PasswordInput>
          </PasswordView>
          <PasswordView>
            <PasswordText>Verify new password</PasswordText>
            <PasswordInput
              secureTextEntry
              onChange={(text) => { setNewPasswordVerify(text.nativeEvent.text) }}
            ></PasswordInput>
          </PasswordView>
          <ChangeButton
            onPress={() => { IsPasswordSame() }}
          >
            <ChangeButtonText>Update</ChangeButtonText>
          </ChangeButton>
        </UpdateEmailPassword> */}
        <SendEmailChangePassword>
          <MailText>Send me an email to change password.</MailText>
          <ChangeButton onPress={() => { value.changePassword(value.userInformation.email) }}>
            <ChangeButtonText>Send Email</ChangeButtonText>
          </ChangeButton>
        </SendEmailChangePassword>
      </Container>
    </SafeAreaView>
  );
};

export default ChangePassword;