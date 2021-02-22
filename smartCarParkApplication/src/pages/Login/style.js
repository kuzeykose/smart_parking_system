import styled from 'styled-components/native'

export const Container = styled.View`
  background: #FFF;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 60px;
`
export const HelloText = styled.Text`
  color: #292929;
  font-size: 24px;
  text-align: center;
`
export const HelloTextSmall = styled.Text`
  color: #292929;
  font-size: 14px;
  text-align: center;
`

export const EmailText = styled.Text`
  color: #292929;
  font-size: 20px;
  margin-top: 100px;
`
export const PasswordText = styled.Text`
  color: #292929;
  font-size: 20px;
  margin-top:10px
`

export const EmailInput = styled.TextInput`
  border: 1px;
  border-radius: 20px;
  height: 40px;
  width: 350px;
  border-color: #61cb61;
  margin-top:4px
  padding-left: 10px;
`

export const PasswordInput = styled.TextInput`
  border: 1px;
  border-radius: 20px;
  height: 40px;
  width: 350px;
  margin-top: 4px;
  border-color: #61cb61;
  padding-left: 10px;
`

export const SignInButton = styled.TouchableOpacity`
  margin-top: 30px;
  background: #4AFF95;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 35px;
  border-radius: 4px;
`

export const SignInText = styled.Text`
  font-size: 18px;
`

export const NewUserText = styled.Text`
  font-size: 16px;
`

export const ShowRegisterButton = styled.TouchableOpacity`
  color: #4AFF95;
`

export const CreateAccountText = styled.Text`
  font-size: 17px;
  color: #00FFB0;
  padding-left:6px
`

export const ForgetPasswordText = styled.Text`
  margin-top:35px;
  font-size: 17px;
  color: #55bf57;
  padding-left:6px
`

export const ForgetPassword = styled.TouchableOpacity`

  color: #55bf57;
  padding-left:6px
`