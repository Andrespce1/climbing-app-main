import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import SedeIndex from './../Sede/Index';
import SedeCreate from './../Sede/Create';
import SedeDelete from './../Sede/Delete';
import SedeDetails from './../Sede/Details';
import SedeEdit from './../Sede/Edit';

const Stack = createNativeStackNavigator();

  const SedeStackNavigation = () => {

    return (
      <Stack.Navigator>
      <Stack.Screen name="SedeIndex" component={SedeIndex} />
      <Stack.Screen name="SedeCreate" component={SedeCreate} />
      <Stack.Screen name="SedeDelete" component={SedeDelete} />
      <Stack.Screen name="SedeDetails" component={SedeDetails} />
      <Stack.Screen name="SedeEdit" component={SedeEdit} />
    </Stack.Navigator>
    );
}

export default SedeStackNavigation;