import React, { Component } from 'react'
import { Text, View } from 'react-native'

import { Container, TypeTitle, TypeDescription, RequestButton, RequestButtonText } from './style'

export default class Details extends Component {
  render() {
    return <Container>
      <TypeTitle>Popular</TypeTitle>
      <TypeDescription>loremimpus sit amet del lacorinato lo simicarda</TypeDescription>
      <TypeTitle>Select</TypeTitle>
      <TypeDescription>price</TypeDescription>
      <RequestButton onPress={() => { }}>
        <RequestButtonText>Book</RequestButtonText>
      </RequestButton>
    </Container>
  }
}

