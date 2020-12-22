import styled from 'styled-components/native'

export const Container = styled.View`
  background: #FFF;
  height: 100%;
  width: 100%;
  padding: 20px;
  align-items: center
  justify-content: space-between;
`

export const Middelof = styled.View`
align-items: center
`

export const ImageView = styled.View`
shadow-opacity: 0.75;
shadow-radius: 10px;
shadow-color: #aaaaaa;
shadow-offset: 2px 2px;
`

export const InitialInformationText = styled.Text`
margin-top: 10px;
margin-bottom: 10px;
font-size: 24px;
margin-right: 50px;
`

export const UserInformationText = styled.Text`
margin-top: 2px;
font-size: 24px;
margin-left: 16px;
color: #3b3b3b;
`

export const TopView = styled.View`
height: 200px;
display: flex;
flex-direction: row;
align-items: center;
margin-bottom: 12px;
`


export const Input = styled.TextInput`
  border-color: #61cb61;
  padding-right: 50px;
  font-size: 24px;
`

export const CarInputView = styled.View`
margin-top: 10px;
`

export const CarTextInput = styled.TextInput`
background: #efeff0;
height: 40px;
width: 330px;
font-size: 20px;
margin-bottom: 15px;
color: #0756F2;
border-radius: 10px
padding-left: 20px;
`
export const InfoText = styled.Text`
font-size: 16px;
text-align: left;
padding-left: 10px;
`


export const SaveButton = styled.TouchableOpacity`
margin-top: 10px;
margin-bottom: 10px;
background: #FBBC04;
height: 50px;
width: 350px;
font-size: 20px;
border-radius: 10px
`

export const SaveButtonText = styled.Text`
font-size: 20px;
text-align: center;
margin: auto
`