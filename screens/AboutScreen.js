import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { auth, db } from "../firebase.config";

export function AboutScreen() {
  const handleSignout = () => auth.signOut();
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("auth", auth);
  }, []);

  return (
    <View style={styles.main}>
      <Text>About Screen</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "white",
    paddingTop: 50,
  },
});
