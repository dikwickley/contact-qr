import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
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
      <View>
        <PrimaryButton
          text={"Security"}
          onPress={() => {
            navigation.navigate("security");
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
    padding: 50,
  },
});
