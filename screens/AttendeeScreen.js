import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { db } from "../firebase.config";
import { getDoc, doc } from "firebase/firestore";
import { PrimaryButton } from "../components/Buttons";

export function AttendeeScreen({ route, navigation }) {
  const { attendeeId } = route.params;
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const docRef = doc(db, "attendee", attendeeId);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("data", docSnap.data());
        setData(docSnap.data());
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveContact = () => {
    console.log("Contact Saved");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ width: "100%", height: "100%" }}>
      {/* <Text>AttendeId: {attendeeId}</Text> */}
      {data && (
        <View style={styles.main}>
          <Text style={styles.text}>{data.name}</Text>
          <Text style={styles.subtext}>
            Department: <Text style={styles.infotext}>{data?.branch}</Text>
          </Text>
          <Text style={styles.subtext}>
            Graduation Year:{" "}
            <Text style={styles.infotext}>{data?.graduationYear}</Text>
          </Text>
          <Text style={styles.subtext}>
            City: <Text style={styles.infotext}>{data?.city}</Text>
          </Text>
          <Text style={styles.subtext}>
            Email: <Text style={styles.infotext}>{data?.email}</Text>
          </Text>
          <Text style={styles.subtext}>
            Mobile Number:{" "}
            <Text style={styles.infotext}>{data?.mobileNumber}</Text>
          </Text>
          <View style={{ marginTop: 150, alignSelf: "flex-end" }}>
            <PrimaryButton
              text={"Save Contact"}
              fontSize={24}
              onPress={saveContact}
            />
          </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    // backgroundColor: "red",
    width: "100%",
    height: "100%",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  subtext: {
    textAlign: "center",
    fontSize: 20,
    color: "grey",
    marginVertical: 2,
  },
  infotext: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  button: {
    margin: 5,
    backgroundColor: "red",
  },
});
