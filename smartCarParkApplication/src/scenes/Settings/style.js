import styled from 'styled-components/native'

export const Container = styled.View`
  background: #FFF;
  height: 100%;
  width: 100%;

  justify-content: space-between;
  padding: 20px;
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

export const Description = styled.View`
  margin-top: 30px;
  width: 100%;
`

export const InitialInformationText = styled.Text`
margin-top: 10px;
font-size: 24px;
margin-left:20px;
`

export const UserInformationText = styled.Text`
margin-top: 10px;
font-size: 24px;
margin-left: 10px;
color:#3b3b3b;
`

export const UserIdText = styled.Text`
text-align: center;
font-size: 22px;
margin-left: 10px;
`