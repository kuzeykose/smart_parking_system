import React, { useContext } from 'react'
import { FirebaseContext } from '../../provider/FirebaseProvider'
import Stars from '../../components/Stars'

import {
  RequestButton,
  RequestButtonText,
  DateTimeCard,
  DateTimeText,
  CardText,
  Container,
  ParkNameText,
  TypeDescription,
  InfoContainer
} from './style'
import { View } from 'react-native';

const PaymentPage = ({ route, navigation }) => {
  const firebaseContext = useContext(FirebaseContext);
  const { destinationInformation } = route.params;

  const timeOptions = { hour12: false, hour: '2-digit', minute: '2-digit' }

  return (
    <Container>
      <InfoContainer>
        <View>
          <ParkNameText>{destinationInformation.parkAdi}</ParkNameText>
          <TypeDescription>{destinationInformation.address}</TypeDescription>
          <Stars rating={destinationInformation.rating} />
        </View>

        <DateTimeCard>
          <View>
            <DateTimeText>Date</DateTimeText>
            <CardText>{firebaseContext.checkInDate.toLocaleDateString().split("/").join("-")}</CardText>
          </View>
          <View>
            <DateTimeText>Time</DateTimeText>
            <CardText>{firebaseContext.checkInTime.toLocaleTimeString('en-US', timeOptions).split("/").join("-") + " - " + firebaseContext.checkOutTime.toLocaleTimeString('en-US', timeOptions).split("/").join("-")}</CardText>
          </View>
        </DateTimeCard>
      </InfoContainer>
      <View>
        <RequestButton onPress={() => {
          console.log(destinationInformation);
          firebaseContext.userBook(
            destinationInformation.parkAdi,
            destinationInformation.latitude,
            destinationInformation.longitude
          ).then(res => {
            console.log(res);
            if (res === "slotsAreNotAvailable") {
              alert("Not Available!")
            }
            if (res === "completed") {
              firebaseContext.setTrigeredActiveBooked(null)
              alert("Completed!")
              navigation.navigate('Home')
            }
          })
        }}>
          <RequestButtonText>Payment</RequestButtonText>
        </RequestButton>
      </View>
    </Container>
  )
}

export default PaymentPage


