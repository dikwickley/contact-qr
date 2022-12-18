import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Pressable, Alert } from "react-native";
import { auth, db } from "../firebase.config";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { SelectList } from "react-native-dropdown-select-list";
import { collection, getDocs } from "firebase/firestore";
import { BarCodeScanner } from "expo-barcode-scanner";
import { PrimaryButton } from "../components/Buttons";

export function CatererScreen({ navigation }) {
  const handleSignout = () => auth.signOut();
  const [user, setUser] = useState(null);
  const [selectedDate, setSelectedDate] = React.useState("");
  const [selectedMeal, setSelectedMeal] = React.useState("");
  const days = [
    { key: "day1", value: "7th January" },
    { key: "day2", value: "8th January" },
    { key: "day3", value: "9th January" },
  ];

  const meals = [
    { key: "meal1", value: "Breakfast" },
    { key: "meal2", value: "Lunch" },
    { key: "meal3", value: "Dinner" },
  ];

  useEffect(() => {
    console.log("auth", auth);
    if (!auth.currentUser) {
      navigation.replace("login");
    }
  }, []);

  useEffect(() => {
    console.log({ selectedDate });
  }, [selectedDate]);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };
  useEffect(() => {
    getBarCodeScannerPermissions();
  }, []);

  const checkEntry = async (attendeeId, date) => {
    const docRef = await doc(db, "attendee", attendeeId);
    console.log({ docRef });
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const document = await docSnap.data();
        return document;
      } else {
        console.log("Document does not exist");
        alert("Error Occured. Contact Admin!");
      }
    } catch (error) {
      console.log(error);
      alert("Error Occured. Contact Admin!");
    }
  };

  const markEntry = async (attendeeId, date, meal) => {
    const docRef = await doc(db, "attendee", attendeeId);
    try {
      let res = await updateDoc(docRef, {
        [`caterering.${date}.${meal}`]: auth.currentUser.email,
      });
      console.log({ res });
    } catch (error) {
      console.log(error);
      alert("Error Occured. Contact Admin!");
    }
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    console.log("attendeeID", data);
    console.log("date", selectedDate);
    console.log("meal", selectedMeal);
    if (selectedDate == "" || selectedDate == null) {
      alert("Select a day");
      return;
    }

    if (selectedMeal == "" || selectedMeal == null) {
      alert("Select a meal");
      return;
    }

    const attendeeId = data;
    const attendee = await checkEntry(attendeeId, selectedDate);
    console.log({ attendee });
    if (attendee.caterering[selectedDate][selectedMeal] == "") {
      createTwoButtonAlert(attendeeId, attendee, selectedDate, selectedMeal);
    } else {
      alert(`Meal already served for ${selectedDate} ${selectedMeal}`);
    }
  };
  const createTwoButtonAlert = (attendeeId, attendee, date, meal) => {
    Alert.alert("Confirm Meal", `Serve to ${attendee.name} for ${date}`, [
      {
        text: "NO",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "YES", onPress: () => markEntry(attendeeId, date, meal) },
    ]);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.main}>
      <SelectList
        placeholder="Select day"
        setSelected={(val) => setSelectedDate(val)}
        data={days}
        save="key"
        search={false}
      />
      <View style={{ margin: 5 }}></View>
      <SelectList
        placeholder="Select meal"
        setSelected={(val) => setSelectedMeal(val)}
        data={meals}
        save="key"
        search={false}
      />
      <View style={styles.scannerView}>
        {!scanned && (
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        )}

        {scanned && (
          <PrimaryButton
            text={"Tap to Scan"}
            onPress={() => setScanned(false)}
          />
        )}
      </View>
      {!scanned && (
        <PrimaryButton text={"Stop Scan"} onPress={() => setScanned(true)} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    margin: 10,
  },
  scannerView: {
    // backgroundColor: "red",\
    marginVertical: 10,
    height: "70%",
    width: "100%",
  },
});
