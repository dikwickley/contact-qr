import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { PrimaryButton } from "../components/Buttons";
import { ContactCard } from "../components/Card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../firebase.config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";

export function HistoryScreen({ navigation }) {
  const [attendeeHistory, setAttendeeHistory] = useState(null);
  const [attendeeData, setAttendeeData] = useState([]);
  const fetchLocalData = async () => {
    try {
      const myArray = await AsyncStorage.getItem("@history");
      if (myArray !== null) {
        // We have data!!
        setAttendeeHistory(JSON.parse(myArray));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchFirebaseData = async () => {
    if (attendeeHistory) {
      console.log("firebase", { attendeeHistory });
      const q = query(
        collection(db, "Alumni"),
        where("__name__", "in", attendeeHistory)
      );
      const querySnapshot = await getDocs(q);
      let _a = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        try {
          console.log(doc.id, " => ", doc.data());
          let { name, branch, graduationYear } = doc.data();

          _a.push({ name, branch, graduationYear, _id: doc.id });
          console.log({ _a });
        } catch (error) {
          console.log(doc.id, " => error");
        }
      });
      setAttendeeData(_a);
    }
  };
  useEffect(() => {
    fetchFirebaseData();
  }, [attendeeHistory]);

  useEffect(() => {
    fetchLocalData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchLocalData();
    }, [])
  );

  useEffect(() => {
    console.log({ attendeeData });
  }, [attendeeData]);

  const handleClearHistory = async () => {
    alert("Confirm Clear History?");
    await AsyncStorage.clear();
    fetchLocalData();
  };

  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        source={require("../assets/question-bg-img.png")}
        style={styles.background}
      />
      <View style={styles.main}>
        <Text style={styles.heading}>History</Text>
        <ScrollView style={styles.cardContainer}>
          {attendeeData.length !== 0 &&
            attendeeData.map((item, index) => {
              return (
                <ContactCard
                  key={index}
                  attendeeId={item._id}
                  name={item.name}
                  department={item.branch}
                  year={item.graduationYear}
                  navigation={navigation}
                />
              );
            })}
        </ScrollView>
        {/* <PrimaryButton text={"Clear History"} onPress={handleClearHistory} /> */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: 20,
  },
  background: {
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: -1,
  },
  heading: {
    fontSize: 50,
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
  },
  cardContainer: {
    marginTop: 50,
  },
});
