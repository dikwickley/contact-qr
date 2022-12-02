import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { auth, db } from "../firebase.config";
import { collection, getDocs } from "firebase/firestore";
export function HomeScreen({ navigation }) {
  const handleSignout = () => auth.signOut();
  const [user, setUser] = useState(null);

  const fetchData = async () => {
    // const querySnapshot = await getDocs(collection(db, "attendee"));
    // querySnapshot.forEach((doc) => {
    //   console.log(`${doc.id} => ${doc.data()}`);
    // });
  };
  useEffect(() => {
    console.log("auth", auth);
    fetchData();
  }, []);

  return (
    <View style={styles.main}>
      <Text>Home Screen</Text>
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
