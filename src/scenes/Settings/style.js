import styled from 'styled-components/native'

export const Container = styled.View`
  background: #FFF;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 60px;
`

export const LogOutButton = styled.TouchableOpacity`
background: red;
justify-content: center;
align-items: center;
height: 44px;
align-self: stretch;
margin-top: 10px;
border-radius:5px
`
export const LogOutText = styled.Text`
color: #fff;
font-weight: bold;
font-size: 18px;
`

export const UserInformationText = styled.Text`
margin-top: 10px;
font-size: 20px;
`