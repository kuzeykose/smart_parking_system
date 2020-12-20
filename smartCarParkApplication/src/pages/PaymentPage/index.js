import React, { useContext, useState, useEffect } from 'react'
import { FirebaseContext } from '../../provider/FirebaseProvider'
import Stars from '../../components/Stars'
import VehicleCard from '../../components/VehicleCard'
import LogoSrc from "../../assets/peugeot.png";

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  RequestButton,
  RequestButtonText,
  DateTimeCard,
  DateTimeText,
  CardText,
  Container,
  ParkNameText,
  TypeDescription,
  InfoContainer,
  VehicleSelection,
  ChangeButton,
  ItemIncludeChange,
  ChangeButtonText,
  Line
} from './style'
import { View, ScrollView, TouchableOpacity } from 'react-native';

const PaymentPage = ({ route, navigation }) => {
  const firebaseContext = useContext(FirebaseContext);
  const { destinationInformation } = route.params;
  const [selectedCar, setSelectedCar] = useState(firebaseContext.userVehicle[0])

  const timeOptions = { hour12: false, hour: '2-digit', minute: '2-digit' }

  return (
    <ScrollView>
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

        <VehicleSelection>
          <ItemIncludeChange>
            <VehicleCard
              LogoSrc={LogoSrc}
              carName={selectedCar.name}
              licensePlate={selectedCar.licensePlate}
            />
            <ChangeButton onPress={() => navigation.navigate("Select Vehicle", {
              setSelectedCar: setSelectedCar
            })}>
              <ChangeButtonText>Change</ChangeButtonText>
            </ChangeButton>
          </ItemIncludeChange>
          <Line />
        </VehicleSelection>

        <View>
          <RequestButton onPress={() => {
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
    </ScrollView>
  )
}

export default PaymentPage


