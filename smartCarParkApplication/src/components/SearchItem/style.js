import styled from 'styled-components/native'

export const Container = styled.View`
shadow-color: #000;
shadow-offset: 0 0;
shadow-opacity: 0.2;
elevation: 3;
border: 1px solid #DDD;
align-items: center;
`

export const SearchItemButton = styled.TouchableOpacity`
  height: 54px;
  background: #fffffe;
  justify-content: center;
  padding-left: 20px
  align-self: stretch;
  margin-top: 1px
  
`

export const SearchItemText = styled.Text`
  color: #292929;
  font-size: 18px;
`