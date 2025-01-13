import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainNavigation from './Screens/shared/MainNavigation';

export default function App() {
  return (
    <MainNavigation>
      
    </MainNavigation>
  );

  //return <DrawerNavigation />;
}
