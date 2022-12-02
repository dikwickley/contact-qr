import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";

const PrimaryButton = ({ text, onPress, fontSize = 20 }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={{ ...styles.buttonText, fontSize: fontSize }}>{text}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    backgroundColor: "#3700b3",
    margin: 4,
    borderRadius: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export { PrimaryButton };
