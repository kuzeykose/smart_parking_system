import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  RatingText
} from './style'

const Stars = (props) => {
  const createStar = (ratingNumber) => {
    let stars = []
    for (let i = 0; i < 5; i++) {
      if (i < ratingNumber) {
        stars[i] = <Icon name="star" size={30} color="#f9b402" />
      } else {
        stars[i] = <Icon name="star" size={30} color="#d7d7d7" />
      }
    }
    return stars
  }

  return (
    <Container style={{ flexDirection: 'row' }}>
      <RatingText>{props.rating}</RatingText>
      {createStar(Math.round(props.rating)).map(item => {
        return item
      })}

    </Container>
  );
}

export default Stars