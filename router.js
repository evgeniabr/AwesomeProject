import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import Home from "./Screens/Home";


const MainStack = createStackNavigator();


export const useRoute = () => {


  return (
    <MainStack.Navigator initialRouteName="Login">
    <MainStack.Screen name="Registration" component={RegistrationScreen} options={{headerShown: false}} />
    <MainStack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
    <MainStack.Screen name="Home" component={Home} options={{headerShown: false}} />
    </MainStack.Navigator>
  )
};


