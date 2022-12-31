import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { PrimaryButton } from "../components/Buttons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function ScannerScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const storeData = async (attendeeId) => {
    try {
      const myArray = await AsyncStorage.getItem("@history");

      let scannedIds = [attendeeId];
      if (myArray !== null) {
        scannedIds = await JSON.parse(myArray);
        scannedIds.push(attendeeId);
      }
      console.log({ scannedIds });
      let unique = [...new Set(scannedIds)];
      console.log({ unique });
      await AsyncStorage.setItem("@history", JSON.stringify(unique));
    } catch (error) {
      console.log(error, "Error saving data");
    }
  };

  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };
  useEffect(() => {
    getBarCodeScannerPermissions();
  }, []);
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    storeData(data);

    navigation.navigate("attendee", {
      attendeeId: data,
    });
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      {scanned && (
        <Image
          resizeMode="cover"
          source={require("../assets/login-form-bg-img.png")}
          style={styles.background}
        />
      )}
      <View style={styles.main}>
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
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    margin: 20,
  },
  background: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
