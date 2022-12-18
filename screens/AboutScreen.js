import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Pressable, Image } from "react-native";
import { auth, db } from "../firebase.config";
import { PrimaryButton } from "../components/Buttons";
import { getAuth, signOut } from "firebase/auth";

export function AboutScreen({ navigation }) {
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        alert("Logged Out");
      })
      .catch((error) => {});
  };
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    console.log("about auth", auth);
  }, [user]);

  return (
    <View style={styles.main}>
      <Image
        resizeMode="cover"
        source={require("../assets/login-form-bg-img.png")}
        style={styles.background}
      />
      <View style={styles.buttonDiv}>
        <PrimaryButton
          text={"Security"}
          onPress={() => {
            navigation.navigate("security");
          }}
        />

        <PrimaryButton
          text={"Caterering"}
          onPress={() => {
            navigation.navigate("caterer");
          }}
        />

        <PrimaryButton
          text={"Logout"}
          onPress={() => {
            handleSignout();
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },
  buttonDiv: {
    margin: 20,
  },
  background: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
