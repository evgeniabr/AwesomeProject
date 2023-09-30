import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { authStateChangeUser } from '../redux/auth/authOperations';
import { useRoute } from "../router";


const MainStack = createStackNavigator();

export default function CoreFile() {
    const { stateChange } = useSelector(state => state.auth);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(authStateChangeUser())
    }, [])

    const routing = useRoute(stateChange);
  return (
    <NavigationContainer> 
   {routing}
    </NavigationContainer>
  )}
