import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import SedeIndex from './../Sede/Index';
import SedeCreate from './../Sede/Create';

const Stack = createNativeStackNavigator();

  const SedeStackNavigation = () => {

    return (
      <Stack.Navigator>
      <Stack.Screen name="SedeIndex" component={SedeIndex} />
      <Stack.Screen name="SedeCreate" component={SedeCreate} />
    </Stack.Navigator>
    );
}

export default SedeStackNavigation;