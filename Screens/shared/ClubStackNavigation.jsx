import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import ClubIndex from './../Club/Index';
import ClubCreate from './../Club/Create';

const Stack = createNativeStackNavigator();

  const ClubStackNavigation = () => {

    return (
      <Stack.Navigator>
      <Stack.Screen name="ClubIndex" component={ClubIndex} options={{ headerShown: false}} />
      <Stack.Screen name="ClubCreate" component={ClubCreate} options={{ headerShown: false}}/>
    </Stack.Navigator>
    );
}

export default ClubStackNavigation;