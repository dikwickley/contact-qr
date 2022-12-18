import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { PrimaryButton } from "../components/Buttons";
import { ContactCard } from "../components/Card";

export function HistoryScreen({ navigation }) {
  useEffect(() => {}, []);

  const handleClearHistory = () => {
    alert("Confirm Clear History?");
  };

  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        source={require("../assets/question-bg-img.png")}
        style={styles.background}
      />
      <View style={styles.main}>
        <Text style={styles.heading}>History</Text>
        <ScrollView style={styles.cardContainer}>
          <ContactCard
            attendeeId={"1234"}
            name={"aniket"}
            department={"IT"}
            year={2023}
            navigation={navigation}
          />
        </ScrollView>
        <PrimaryButton text={"Clear History"} onPress={handleClearHistory} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: 20,
  },
  background: {
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: -1,
  },
  heading: {
    fontSize: 50,
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
  },
  cardContainer: {
    marginTop: 50,
  },
});
