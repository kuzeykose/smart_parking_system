import styled from 'styled-components/native'

export const Container = styled.View`
  background: #FFF;
  height: 100%;
  width: 100%;
  align-items: center;
  padding: 60px;
`

export const Card = styled.TouchableOpacity`
background-color: #fff;
border-style: solid;
border-width: 1px;
border-radius: 2px;
border-color: #DDD;
width: 100%;
box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
margin-top: 30px;
display: flex;
text-align: center;
`

export const CardText = styled.Text`
  color: #222
  margin-top: 10px
  margin-bottom: 2px
  text-align: center;
  font-size: 24px;
`

export const AddCar = styled.TouchableOpacity`
margin-left: 20px;
background: #55bf57;
justify-content: center;
align-items: center;
height: 40px;
align-self: stretch;
margin-top: 10px;
border-radius:5px
width: 100px;
`
export const AddCarText = styled.Text`
color: #fff;
font-weight: bold;
font-size: 18px;
`