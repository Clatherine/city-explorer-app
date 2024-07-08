import { Text, StyleSheet } from "react-native";
import CityDropdown from "./CityDropdown";
import AttractionsList from "./AttractionsList";
import { Suspense, useContext, useEffect, useState } from "react";
import { getBucketListItemsByUser } from "@/app/api";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppContext } from "@/app/AppContext";

export default function BucketListPage({navigation}){
    const { user, cityName, bucketListMemo } = useContext(AppContext)
    const { username } = user;

    return (
        <ParallaxScrollView
        headerBackgroundColor={{ light: "#faf7f0", dark: "#353636" }}
        headerImage={
          <Ionicons size={310} name="star" style={styles.headerImage} />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Bucket List</ThemedText>
        </ThemedView>
        <ThemedText>Welcome to the Bucket List:</ThemedText>
        <CityDropdown navigation={navigation}/>
        <Suspense fallback={<p>loading...</p>}>
          {bucketListMemo.length ? <AttractionsList cityName={cityName} attractions={bucketListMemo} navigation={navigation}/> : <Text>No attractions in your bucket list for {cityName}, go to the home page to add some or choose another city!</Text>}
        </Suspense>
      </ParallaxScrollView>)
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