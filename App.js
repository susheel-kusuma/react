import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import LoadingScreen from "./screens/LoadingScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";

import PostScreen from "./screens/PostScreen";
import ProfileScreen from "./screens/ProfileScreen";

import * as firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyAGzbyWpdIlnHB3zqTJciuUr3CpUc0RgPY",
  authDomain: "isabella-gosu.firebaseapp.com",
  databaseURL: "https://isabella-gosu.firebaseio.com",
  projectId: "isabella-gosu",
  storageBucket: "isabella-gosu.appspot.com",
  messagingSenderId: "804012751978",
  appId: "1:804012751978:web:fcf68ea80afff7820b1e13",
  measurementId: "G-7GJ7629XV9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const AppTabNavigator = createBottomTabNavigator();

function RootStack() {
  return (
    <NavigationContainer>
      <AppTabNavigator.Navigator
        initialRouteName="Home"
        screenOptions={{ gestureEnabled: false }}
      >
        <AppTabNavigator.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ tintColor }) => (
              <Ionicons name="ios-home" size={36} color={tintColor}></Ionicons>
            ),
            tabBarLabel: "",
          }}
        />

        <AppTabNavigator.Screen
          name="Post"
          component={PostScreen}
          options={{
            tabBarIcon: ({ tintColor }) => (
              <Ionicons
                name="ios-add-circle"
                size={45}
                color="#E9446A"
                style={{
                  shadowColor: "#E9446A",
                  shadowOffset: { width: 0, height: 0 },
                  shadowRadius: 10,
                  shadowOpacity: 0.3,
                }}
              ></Ionicons>
            ),
            tabBarLabel: "",
          }}
        />

        <AppTabNavigator.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ tintColor }) => (
              <Ionicons
                name="ios-person"
                size={35}
                color={tintColor}
              ></Ionicons>
            ),
            tabBarLabel: "",
          }}
        />
      </AppTabNavigator.Navigator>
    </NavigationContainer>
  );
}

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
});
export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: RootStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: "Loading",
    }
  )
);
