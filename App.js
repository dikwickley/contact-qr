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
      <Stack.Navigator>
        {/* {!user && (
          <Stack.Group
            screenOptions={{ presentation: "modal", headerShown: false }}
          >
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="register" component={Register} />
          </Stack.Group>
        )} */}

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

          {/* <Stack.Screen
              options={{ headerShown: false, presentation: "modal" }}
              name="question"
              component={Question}
            />
            <Stack.Screen
              options={{ headerShown: false, presentation: "modal" }}
              name="result"
              component={Result}
            /> */}
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
          tabBarActiveTintColor: "#FFABAB",
          tabBarInactiveTintColor: "gray",
        }}
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
          name="About"
          component={AboutScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="info" color={color} size={40} />
            ),
          }}
        />

        {/* {!user && (
          <Tab.Screen
            name="login"
            component={LoginScreen}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="person" color={color} size={40} />
              ),
            }}
          />
        )}
        {user && (
          <Tab.Screen
            name="profile"
            component={ProfileScreen}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="person" color={color} size={40} />
              ),
            }}
          />
        )} */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
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
        name="About"
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
