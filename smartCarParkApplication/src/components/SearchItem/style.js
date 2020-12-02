import styled from 'styled-components/native'

export const Container = styled.View`
elevation: 3;
border: 1px solid #DDD;
background: #fffffe;
padding-left: 20px
padding-right: 20px
`

export const SearchItemButton = styled.TouchableOpacity`
  height: 54px;  
  justify-content: center;
  align-self: stretch;
  margin-top: 1px
`

export const SearchItemText = styled.Text`
  color: #292929;
  font-size: 18px;
`
export const Stars = styled.Text`
  color: #292929;
  font-size: 18px; 
`
export const Price = styled.Text`
  color: #292929;
  font-size: 18px;
`

export const SubInformation = styled.View`
display:flex;
flex-direction: row;
justify-content: space-between;
`