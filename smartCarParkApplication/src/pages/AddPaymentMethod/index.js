import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../../provider/FirebaseProvider';

import Visa from '../../assets/Visa.png'
import Mastercard from '../../assets/Mastercard.png'
import Discover from '../../assets/Discover.png'
import Amex from '../../assets/Amex.png'

import {
  CarInputView,
  InfoText,
  CarTextInput,
  Container,
  SaveButton,
  SaveButtonText,
  BankCard,
  Logo,
  CardText,
  CardTop,
  CardBottom,
  Btm,
  InputContainer,
  CVVTextInput
} from './style'

import {
  View,
  Alert
} from 'react-native';

const AddPaymentMethod = ({ navigation: { goBack } }) => {
  const value = useContext(FirebaseContext);
  const [nameSurname, setNameSurname] = useState('NAME SURNAME')
  const [cardNumber, setCardNumber] = useState('')
  const [expirationDate, setExpirationDate] = useState('')
  const [cardCVV, setCardCVV] = useState('')
  const [cardCompanyLogo, setCardCompanyLogo] = useState(null)

  const handlingCardNumber = (number) => {
    switch (parseInt(number[0])) {
      case 3:
        setCardCompanyLogo(Amex)
        break;
      case 4:
        setCardCompanyLogo(Visa)
        break;
      case 5:
        setCardCompanyLogo(Mastercard)
        break;
      case 6:
        setCardCompanyLogo(Discover)
        break;
      default:
        setCardCompanyLogo(null)
        break;
    }

    if (parseInt(number[0]) === 3) {
      if (number.length < 17) {
        setCardNumber(number.replace(/\b(\d{4})(\d{6})(\d{5})\b/, '$1 $2 $3').trim())
      }
    } else {
      if (number.length < 20) {
        setCardNumber(number.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())
      }
    }
  }

  const handlingExpirationDate = (date) => {
    if (date.length < 5) {
      setExpirationDate(date.replace(/(\d{2})(\d{2})/g, '$1/$2'))
    }
  }

  const handlingCVV = (cvv) => {
    if (cvv.length < 4) {
      setCardCVV(cvv)
    }
  }

  return (
    <Container>
      <BankCard>
        <CardTop>
          <CardText>
            {nameSurname.toUpperCase()}
          </CardText>
          {cardCompanyLogo &&
            <Logo source={cardCompanyLogo} />
          }
        </CardTop>
        <CardBottom>
          <CardText>
            {cardNumber}
            {cardNumber === '' ? 'CARD NUMBER' : ''}
          </CardText>
          <CardText>
            {expirationDate}
            {expirationDate === '' ? 'EXPIRATION DATE' : ''}
          </CardText>
        </CardBottom>
      </BankCard>

      <InputContainer>
        <CarInputView>
          <InfoText>Name and Surname</InfoText>
          <CarTextInput
            onChange={(text) => { setNameSurname(text.nativeEvent.text) }}
          ></CarTextInput>
        </CarInputView>

        <CarInputView>
          <InfoText>Card Number</InfoText>
          <CarTextInput
            onChange={(text) => { handlingCardNumber(text.nativeEvent.text) }}
            placeholder={'0000 0000 0000 0000'}
            value={cardNumber}
          ></CarTextInput>
        </CarInputView>

        <Btm>
          <CarInputView>
            <InfoText>Expiration date</InfoText>
            <CarTextInput
              onChange={(text) => { handlingExpirationDate(text.nativeEvent.text) }}
              placeholder={'MM/YY'}
              value={expirationDate.replace(/(\d{2})(\d{2})/g, '$1/$2')}
            ></CarTextInput>
          </CarInputView>

          <CarInputView>
            <InfoText>CVV</InfoText>
            <CVVTextInput
              onChange={(text) => { handlingCVV(text.nativeEvent.text) }}
              placeholder={'CVV'}
              value={cardCVV}
            ></CVVTextInput>
          </CarInputView>
        </Btm>
      </InputContainer>

      <SaveButton onPress={() => {
        console.log();
        if (cardNumber[0] === '3' || cardNumber[0] === '4' || cardNumber[0] === '5' || cardNumber[0] === '6') {
          value.addPaymentMethod(nameSurname.toUpperCase(), cardNumber, expirationDate, cardCVV)
          goBack()
        } else {
          Alert.alert("Plese write bank card or credit card")
        }

      }}>
        <SaveButtonText>
          Save
      </SaveButtonText>
      </SaveButton>
    </Container>
  );
};


export default AddPaymentMethod;