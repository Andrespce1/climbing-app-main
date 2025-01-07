import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeIndex from '../Home/Index';
import LoginScreen from '../Autorizacion/LoginScreen';
import ForgotScreen from '../Autorizacion/ForgotScreen';
import Competencias from '../Home/Competencias';

const Stack = createNativeStackNavigator();



const AutorizacionStackNavigation = () => {

    return (
        <Stack.Navigator initialRouteName='HomeIndex'>
          <Stack.Screen name="HomeIndex" component={HomeIndex} options={{ headerShown: false}} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: true}} />
          <Stack.Screen name="CompetenciasScreen" component={Competencias} options={{ headerShown: true}} />
          <Stack.Screen name="ForgotScreen" component={ForgotScreen} options={{ headerShown: true}} />
        </Stack.Navigator>
    );
}

export default AutorizacionStackNavigation;