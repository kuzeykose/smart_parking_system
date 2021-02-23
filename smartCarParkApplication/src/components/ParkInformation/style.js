import styled from 'styled-components/native'

export const Container = styled.View`
  margin: 20px
  background: #FFF
  height: 200
  width: 90%
  position: absolute
  bottom: 85
  shadow-color: #000
  shadow-offset: 0 0
  shadow-opacity: 0.1
  elevation: 3
  border: 1px solid #D3D3D3
  border-radius: 100px
  padding: 20px
  display: flex
  justify-content: center
`

export const TypeDescription = styled.Text`
  color: #222
  font-size: 20px
`
export const ParkNameText = styled.Text`
  color: #292929
  font-size: 26px
  margin-top:5px
  margin-bottom:8px
`

export const RequestButton = styled.TouchableOpacity`
  background: #00FFB0
  height: 45px
  width: 100px
  border-radius: 30px
  margin-top: 10px
  top: -15  
  `

export const RequestButtonText = styled.Text`
  font-size: 20px
  text-align: center
  margin: auto
`