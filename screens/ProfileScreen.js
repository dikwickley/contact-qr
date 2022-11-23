import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { auth, db } from "../firebase.config";

export function ProfileScreen() {
  const handleSignout = () => auth.signOut();
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("auth", auth);
  }, []);

  return (
    <View style={styles.main}>
      <Text style={styles.email}>{auth?.currentUser?.email}</Text>
      <Pressable style={styles.button} onPress={handleSignout}>
        <Text style={styles.buttonText}>logout</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingTop: 50,
  },
  email: {
    paddingHorizontal: 20,
    fontSize: 20,
    textAlign: "left",
  },
  buttonDiv: {
    width: "100%",
    paddingTop: 10,
    paddingRight: 20,
  },

  button: {
    margin: 5,
    width: 80,
    height: 30,
    backgroundColor: "black",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    alignSelf: "center",
    alignItems: "center",
    fontSize: 20,
  },
});
