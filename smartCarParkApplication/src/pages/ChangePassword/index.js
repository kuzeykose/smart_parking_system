import React, { useContext } from 'react';

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
  Text,
  View,
  SafeAreaView
} from 'react-native';

import { FirebaseContext } from '../../provider/FirebaseProvider';

const ChangePassword = () => {
  const value = useContext(FirebaseContext);
  return (
    <SafeAreaView>
      <Container>
        <UpdateEmailPassword>
          <PasswordView>
            <PasswordText >Current password</PasswordText>
            <PasswordInput
              secureTextEntry
            ></PasswordInput>
          </PasswordView>
          <PasswordView>
            <PasswordText>New password</PasswordText>
            <PasswordInput
              secureTextEntry
            ></PasswordInput>
          </PasswordView>
          <PasswordView>
            <PasswordText>Verify new password</PasswordText>
            <PasswordInput
              secureTextEntry
            ></PasswordInput>
          </PasswordView>
          <ChangeButton>
            <ChangeButtonText>Update</ChangeButtonText>
          </ChangeButton>
        </UpdateEmailPassword>
        <SendEmailChangePassword>
          <MailText>Send me an email to change password.</MailText>
          <ChangeButton>
            <ChangeButtonText>Send Email</ChangeButtonText>
          </ChangeButton>
        </SendEmailChangePassword>
      </Container>
    </SafeAreaView>
  );
};

export default ChangePassword;