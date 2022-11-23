import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput,
} from "react-native";
// import { auth } from "./../firebase.config";
import {} from "firebase/auth";
import { auth } from "./../firebase.config";

export function LoginScreen() {
  const [number, onChangeNumber] = React.useState(null);

  const handleVerify = () => {};
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text>Login Screen</Text>

      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Enter Phone Number"
        keyboardType="numeric"
      />

      <Button title={"Verify"} onPress={handleVerify} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
