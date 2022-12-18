import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Pressable, Image } from "react-native";

export function HomeScreen({ navigation }) {
  useEffect(() => {}, []);

  return (
    <View style={styles.main}>
      <Image
        resizeMode="cover"
        source={require("../assets/main-bg-img.png")}
        style={styles.background}
      />
      <Text style={styles.heading}>Celebrating 75 Years Of Excellence</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    margin: 20,
  },
  background: {
    position: "absolute",
    opacity: 1,
    flex: -1,
  },
  heading: {
    fontSize: 50,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
});
