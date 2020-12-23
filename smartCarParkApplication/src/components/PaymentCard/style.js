import styled from 'styled-components/native'

export const Card = styled.View`
  flex-direction: row
  align-items: center
  margin-bottom: 20px
  justify-content: space-between
`

export const InfoImage = styled.View`
  flex-direction: row
`

export const TextContainer = styled.View`
  padding-left: 20px
  margin-top: 10px
`

export const Logo = styled.Image`
  width: 72.5px
  height: 50px
  margin-top: 15px
`

export const CardText = styled.Text`
  color: #292929
  margin-top: 2px
  font-size: 20px
  font-weight: 300
`
export const DeleteButton = styled.TouchableOpacity`
align-items: center
justify-content: center
width: 50px
height: 50px
`