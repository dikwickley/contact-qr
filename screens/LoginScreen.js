import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput,
  Dimensions,
  Pressable,
} from "react-native";
import { auth } from "./../firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

export function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((creds) => {
        const user = creds.user;
        console.log(user);
        setLoading(false);
        navigation.navigate("about");
      })
      .catch((error) => {
        alert(error.message);
        setLoading(false);
      });
  };

  return loading ? (
    <View style={styles.main}>
      <Text>Loading...</Text>
    </View>
  ) : (
    <View style={styles.main}>
      <View style={styles.form}>
        {/* <Text style={styles.title}>login</Text> */}
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>signin</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "white",
  },

  form: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 30,
  },

  background: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },

  title: {
    fontSize: 30,
    margin: 5,
  },

  input: {
    margin: 5,
    height: 40,
    width: 250,
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderColor: "black",
    borderWidth: 3,
    fontSize: 20,
  },

  button: {
    margin: 5,
    width: 125,
    height: 40,
    backgroundColor: "black",
    color: "white",
    alignSelf: "flex-end",

    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    alignSelf: "center",
    alignItems: "center",
    fontSize: 30,
  },
});
