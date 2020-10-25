import styled from 'styled-components/native'

export const Container = styled.View`
background: #FFF;
height: 100%;
width: 100%;
padding: 20px;
justify-content: space-between;
`

export const ImageView = styled.View`
shadow-opacity: 0.75;
shadow-radius: 10px;
shadow-color: #aaaaaa;
shadow-offset: 2px 2px;
`
export const TopView = styled.View`
height: 200px;
display: flex;
flex-direction: row;
align-items: center;
margin-bottom: 12px;
`

export const TouchbaleListItem = styled.TouchableOpacity`
height: 50px;
display: flex;
flex-direction: row;
justify-content: space-between;
`

export const ListName = styled.Text`
font-size: 20px;
margin-bottom: 15px;
color: #0756F2;
`

export const TouchbaleListItemText = styled.Text`
color: #292929;
font-size: 24px
margin-left: 20px;
`

export const LogOutButton = styled.TouchableOpacity`
background: #BF0404;
justify-content: center;
align-items: center;
height: 40px;
align-self: stretch;
margin-top: 10px;
border-radius:5px
width: 100px;
`

export const LogOutText = styled.Text`
color: #fff;
font-weight: bold;
font-size: 18px;
`

export const UserInformationText = styled.Text`
margin-top: 2px;
font-size: 24px;
margin-left: 16px;
color: #3b3b3b;
`

export const InitialInformationText = styled.Text`
margin-top: 10px;
margin-bottom: 10px;
font-size: 24px;
margin-right: 50px;
`
