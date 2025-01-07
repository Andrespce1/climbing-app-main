import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import BottomTabsNavigation from './BottomTabsNavigation';



const Stack = createNativeStackNavigator();



const AppStackNavigation = () => {

    return (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={BottomTabsNavigation}
          options={{ headerShown: false}} />
        </Stack.Navigator>
    );
}

export default AppStackNavigation;