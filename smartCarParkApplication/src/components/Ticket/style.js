import styled, { css } from 'styled-components/native'
import { Platform } from 'react-native'

export const Card = styled.View`
background-color: #fff;
border-style: solid;
border-width: 1px;
border-radius: 2px;
border-color: #DDD;
height: 200px;
width: 100%;
box-shadow: 0px 6px 5px rgba(0, 0, 0, 0.1);
margin-top: 10px;
display: flex;
text-align: center;
`

export const CardText = styled.Text`
  color: #222
  margin-top: 2px
  text-align: center;
  font-size: 24px;
`

export const LocationBox = styled.View`
  background: #FFF;
  shadow-color: #000;
  shadow-offset: 0 0;
  shadow-opacity: 0.1;
  elevation: 1;
  border: 1px solid #ddd;
  border-radius: 3px;
  flex-direction: row;
  ${Platform.select({
  ios: css`
      margin-top: 20px;
    `,
  android: css`
      margin-top: 10px;
      margin-left: 10px;
    `
})}
`

export const LocationText = styled.Text`
  margin: 8px 10px;
  font-size: 14px;
`
