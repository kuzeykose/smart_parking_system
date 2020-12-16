import React, { useContext, useState } from 'react'
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
  const [radioButton, setRadioButton] = useState(true)

  const timeOptions = { hour12: false, hour: '2-digit', minute: '2-digit' }

  const options = [
    {
      logo: LogoSrc,
      carName: "Kuzey Araba",
      licencePlate: "34 PG 2020"
    },
    {
      logo: LogoSrc,
      carName: "Kuzey Araba",
      licencePlate: "34 PG 2020"
    }
  ];

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
            {radioButton ?
              <Icon name="radio-button-checked" size={20} color="#FBBC04" />
              : <Icon name="radio-button-unchecked" size={20} color="#FBBC04" />
            }

            <TouchableOpacity onPress={() => {
              firebaseContext.setSelectedCar(options[0])
              setRadioButton(!radioButton)
            }}>
              <VehicleCard
                LogoSrc={options[0].logo}
                carName={options[0].carName}
                licensePlate={options[0].licencePlate}
              />
            </TouchableOpacity>
            <ChangeButton onPress={() => navigation.navigate("Select Vehicle")}>
              <ChangeButtonText>Change</ChangeButtonText>
            </ChangeButton>
          </ItemIncludeChange>
          <Line />
          <ItemIncludeChange>
            {!radioButton ?
              <Icon name="radio-button-checked" size={20} color="#FBBC04" />
              : <Icon name="radio-button-unchecked" size={20} color="#FBBC04" />
            }
            <TouchableOpacity onPress={() => {
              firebaseContext.setSelectedCar(options[1])
              setRadioButton(!radioButton)
            }}>
              <VehicleCard
                LogoSrc={options[1].logo}
                carName={options[1].carName}
                licensePlate={options[1].licencePlate}
              />
            </TouchableOpacity>
          </ItemIncludeChange>
        </VehicleSelection>

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
    </ScrollView>
  )
}

export default PaymentPage


