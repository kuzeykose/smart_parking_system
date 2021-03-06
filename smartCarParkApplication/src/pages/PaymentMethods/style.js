import styled from 'styled-components/native'

export const Container = styled.View`
  background: #FFF
  height: 100%
  width: 100%
`

export const Card = styled.View`
  border-bottom-width: 0.5px
  border-bottom-color: #D3D3D3
  margin-top: 30px
  margin-left: 20px
  margin-right: 20px
  margin-right: 20px
  flex-direction: row
  justify-content: space-between
`

export const TextContainer = styled.View`
  padding-left: 20px
  margin-top: 10px
`

export const Logo = styled.Image`
  width: 90px
  height: 90px
  margin-bottom: 30px
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
margin-top: 12px
width: 50px
height: 50px
`
