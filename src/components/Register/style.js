import styled from 'styled-components/native'

export const Container = styled.View`
  background: #FFF;
  height: 100%;
  width: 100%;
  align-items: center;
  padding: 60px;
`

// TEXT
export const HelloText = styled.Text`
  color: #292929;
  font-size: 24px;
  text-align: center;
`
export const HelloTextSmall = styled.Text`
  color: #292929;
  font-size: 20px;
  text-align: center;
`
export const CustomText = styled.Text`
  color: #292929;
  font-size: 20px;
  margin-top :10px
`

//TEXTINPUT
export const EmailInput = styled.TextInput`
  border: 1px;
  border-radius: 4px;
  height: 40px;
  width: 350px;
  border-color: #61cb61;
  margin-top:4px
  padding-left: 10px;
`

export const PasswordInput = styled.TextInput`
  border: 1px;
  border-radius: 4px;
  height: 40px;
  width: 350px;
  margin-top: 4px;
  border-color: #61cb61;
  padding-left: 10px;
`

//BUTTON
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
  color: #55bf57;
  padding-left:6px
`