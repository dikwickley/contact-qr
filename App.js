import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, StyleSheet, Text, View } from "react-native";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { auth } from "./firebase.config";

import { HomeScreen } from "./screens/HomeScreen";
import { ScannerScreen } from "./screens/ScannerScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { AboutScreen } from "./screens/AboutScreen";
import { AttendeeScreen } from "./screens/AttendeeScreen";
import { SecurityScreen } from "./screens/SecurityScreen";
import { CatererScreen } from "./screens/CatererScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [dataLoad, setDataLoad] = useState(false);
  const [user, setUser] = useState(null);
  console.disableYellowBox = true;

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsub;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Group>
          <Stack.Screen
            name="root"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            options={{ presentation: "modal" }}
            name="attendee"
            component={AttendeeScreen}
          />

          <Stack.Screen
            options={{ presentation: "modal" }}
            name="security"
            component={SecurityScreen}
          />

          <Stack.Screen
            options={{ presentation: "modal" }}
            name="caterer"
            component={CatererScreen}
          />

          <Stack.Screen
            options={{ presentation: "modal" }}
            name="login"
            component={LoginScreen}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarActiveTintColor: "#FFABAB" }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={40} />
          ),
        }}
      />

      <Tab.Screen
        name="scanner"
        component={ScannerScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="camera" color={color} size={40} />
          ),
        }}
      />

      <Tab.Screen
        name="about"
        component={AboutScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="info" color={color} size={40} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
