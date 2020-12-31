import React, { useContext, useState, useEffect } from 'react'
import { FirebaseContext } from '../../provider/FirebaseProvider'
import Stars from '../../components/Stars'
import VehicleCard from '../../components/VehicleCard'
import LogoSrc from "../../assets/peugeot.png";
import PaymentCard from "../../components/PaymentCard"

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
  PriceText,
  PriceView,
  AddText,
} from './style'

import { View, ScrollView, Alert, Text } from 'react-native';

const PaymentPage = ({ route, navigation: { navigate, goBack } }) => {
  const firebaseContext = useContext(FirebaseContext);
  const { destinationInformation, price } = route.params;
  const [selectedCar, setSelectedCar] = useState(firebaseContext.userVehicle[0])
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(firebaseContext.userPaymentMethods[0])

  const timeOptions = { hour12: false, hour: '2-digit', minute: '2-digit' }

  return (
    <ScrollView>
      <Container>
        <InfoContainer>
          <View>
            <ParkNameText>{destinationInformation.parkName}</ParkNameText>
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
          {selectedCar ?
            <ItemIncludeChange>
              <VehicleCard
                LogoSrc={LogoSrc}
                carName={selectedCar.name}
                licensePlate={selectedCar.licensePlate}
              />
              <ChangeButton onPress={() => navigate("Select Vehicle", {
                setSelectedCar: setSelectedCar
              })}>
                <ChangeButtonText>Change</ChangeButtonText>
              </ChangeButton>
            </ItemIncludeChange>
            :
            <ItemIncludeChange>
              <AddText>Please add vehicle</AddText>
              <ChangeButton onPress={() => {
                goBack()
                navigate('Add Car')
              }}>
                <ChangeButtonText>Change</ChangeButtonText>
              </ChangeButton>
            </ItemIncludeChange>

          }
        </VehicleSelection>

        <VehicleSelection>
          {selectedPaymentMethod ?
            <ItemIncludeChange>
              <PaymentCard
                name={selectedPaymentMethod.nameSurname}
                cardNumber={selectedPaymentMethod.cardNumber}
              />
              <ChangeButton onPress={() => navigate("Select Payment Method", {
                setSelectedPaymentMethod: setSelectedPaymentMethod
              })}>
                <ChangeButtonText>Change</ChangeButtonText>
              </ChangeButton>
            </ItemIncludeChange>
            :
            <ItemIncludeChange>
              <AddText>Please add payment method</AddText>
              <ChangeButton onPress={() => {
                goBack()
                navigate('Add Payment Method')
              }}>
                <ChangeButtonText>Change</ChangeButtonText>
              </ChangeButton>
            </ItemIncludeChange>
          }
        </VehicleSelection>

        <View>
          <RequestButton onPress={() => {
            console.log(selectedCar, selectedPaymentMethod);
            if (selectedCar === undefined || selectedPaymentMethod === undefined) {
              Alert.alert("Please add vehicle and payment method for booking!")
            } else {
              firebaseContext.userBook(
                destinationInformation.parkName,
                destinationInformation.latitude,
                destinationInformation.longitude,
                selectedCar
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
            }
          }}>
            <PriceView>
              <PriceText>{price} ₺</PriceText>
            </PriceView>
            <RequestButtonText>Payment</RequestButtonText>
          </RequestButton>
        </View>
      </Container>
    </ScrollView >
  )
}

export default PaymentPage


