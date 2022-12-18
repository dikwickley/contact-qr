import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Pressable, Alert } from "react-native";
import { auth, db } from "../firebase.config";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { SelectList } from "react-native-dropdown-select-list";
import { collection, getDocs } from "firebase/firestore";
import { BarCodeScanner } from "expo-barcode-scanner";
import { PrimaryButton } from "../components/Buttons";

export function SecurityScreen({ navigation }) {
  const handleSignout = () => auth.signOut();
  const [user, setUser] = useState(null);
  const [selectedDate, setSelectedDate] = React.useState("");
  const data = [
    { key: "1", value: "7thJanuary" },
    { key: "2", value: "8thJanuary" },
    { key: "3", value: "9thJanuary" },
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

  const markEntry = async (attendeeId, date) => {
    const docRef = await doc(db, "attendee", attendeeId);
    try {
      let res = await updateDoc(docRef, {
        [`security.${date}`]: auth.currentUser.email,
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
    if (selectedDate == "" || selectedDate == null) {
      alert("Select a day");
      return;
    }
    const attendeeId = data;
    const attendee = await checkEntry(attendeeId, selectedDate);
    console.log({ attendee });
    if (attendee.security[selectedDate] == "") {
      createTwoButtonAlert(attendeeId, attendee, selectedDate);
    } else {
      alert(`Entry Already given for ${selectedDate}`);
    }
  };
  const createTwoButtonAlert = (attendeeId, attendee, date) => {
    Alert.alert("Confirm Entry", `Give Entry to ${attendee.name} for ${date}`, [
      {
        text: "NO",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "YES", onPress: () => markEntry(attendeeId, selectedDate) },
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
        data={data}
        save="value"
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
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    padding: 10,
  },
  scannerView: {
    // backgroundColor: "red",\
    marginVertical: 10,
    height: "90%",
    width: "100%",
  },
});
