import styled from 'styled-components/native'

export const Container = styled.View`
  background: #FFF;
  height: 100%;
  width: 100%;
  justify-content: space-between;
  padding: 20px;
`

export const UpdateButton = styled.TouchableOpacity`
background: #F5C81C;
justify-content: center;
align-items: center;
height: 40px;
align-self: stretch;
margin-top: 10px;
border-radius:5px
width: 100px;
`
export const UpdateButtonText = styled.Text`
color: #fff;
font-weight: bold;
font-size: 18px;
`
export const InitialInformationText = styled.Text`
margin-top: 10px;
margin-bottom: 10px;
font-size: 24px;
margin-right: 50px;
`

export const UserInformationText = styled.Text`
margin-top: 10px;
margin-bottom: 10px;
padding-right: 50px;
font-size: 24px;
margin-left: 30px;
color:#3b3b3b;
`

export const TopView = styled.View`
margin-top:10px;
height: 150px;
display: flex;
flex-wrap: wrap;
align-content: center;
box-shadow: 4px 4px 4px #aaaaaa;
`
export const InformationCard = styled.View`
margin-top: 10px;
background-color: #fff;
border-style: solid;
border-width: 1px;
border-radius: 2px;
border-color: #DDD;
width: 100%;
display: flex;
flex-direction: row;
text-align: center;
justify-content: space-between;
`

export const Input = styled.TextInput`
  border-color: #61cb61;
  padding-right: 50px;
  font-size: 24px;
`
