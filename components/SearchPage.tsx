import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CityDropdown from "@/components/CityDropdown";
import AttractionsList from "@/components/AttractionsList";
import { useState, useEffect } from "react";
import { getAttractions, getCities, getCity } from "@/app/api";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function SearchPage({navigation}) { 
const [cityName, setCityName] = useState("London")
const [attractions, setAttractions] = useState([])
useEffect(()=>{
        getCity(cityName).then((response)=>{
        getAttractions(response.city.city_longitude, response.city.city_latitude, response.city.city_radius)
        .then((response)=>{setAttractions(response.data.places)})
    }).catch((err) => {console.log(err)})
},[cityName])
return (
   
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="home" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          Welcome! This is where the map and search feature will be:
        </ThemedText>
      </ThemedView>
      <CityDropdown setCityName={setCityName} cityName={cityName}/>
      <AttractionsList cityName={cityName} attractions={attractions} navigation={navigation}/>
    </ParallaxScrollView>
 
  );
}

const styles = StyleSheet.create({
    headerImage: {
      color: "#FF4D4D",
      bottom: -90,
      left: -35,
      position: "absolute",
    },
    titleContainer: {
      flexDirection: "row",
      gap: 8,
    },
  });
  