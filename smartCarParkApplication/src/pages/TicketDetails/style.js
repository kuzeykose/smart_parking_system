import styled, { css } from 'styled-components/native'

export const Card = styled.TouchableOpacity`
  padding: 15px
  background-color: #fff
  border-style: solid
  border-width: 1px
  border-radius: 5px
  border-color: #DDD
  box-shadow: 0px 6px 5px rgba(0, 0, 0, 0.1)
  margin: 10px
`
export const CardHeader = styled.View`
  flex-direction: row
  justify-content: space-between
`

export const DateTimeCard = styled.View`
  background-color: #FBBC04
  border-style: solid
  border-width: 1px
  border-radius: 8px
  border-color: #EDB102
  margin-top: 5px
  flex-direction: row
  justify-content: space-between
  padding: 10px
`

export const CardText = styled.Text`
  color: #222
  margin-top: 2px
  font-size: 24px
`
export const DateTimeText = styled.Text`
  color: #222
  margin-top: 2px
  font-size: 24px
  font-weight: 300 
  text-align: center;
`