import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";

const ContactCard = ({ attendeeId, name, department, year, navigation }) => {
  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        navigation.navigate("attendee", {
          attendeeId: attendeeId,
        });
      }}
    >
      <Text>name: {name}</Text>
      <Text>department: {department}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    backgroundColor: "transparent",
    margin: 4,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 3,
  },
  cardText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export { ContactCard };
