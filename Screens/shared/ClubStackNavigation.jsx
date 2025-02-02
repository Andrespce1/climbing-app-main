import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import ClubIndex from './../Club/Index';
import ClubCreate from './../Club/Create';
import ClubDelete from './../Club/Delete';
import ClubDetails from './../Club/Details';
import ClubEdit from './../Club/Edit';

const Stack = createNativeStackNavigator();

  const ClubStackNavigation = () => {

    return (
      <Stack.Navigator>
      <Stack.Screen name="ClubIndex" component={ClubIndex} options={{ headerShown: false}} />
      <Stack.Screen name="ClubCreate" component={ClubCreate} options={{ headerShown: false}}/>
      <Stack.Screen name="ClubDelete" component={ClubDelete} options={{ headerShown: false}} />
      <Stack.Screen name="ClubDetails" component={ClubDetails} options={{ headerShown: false}}/>
      <Stack.Screen name="ClubEdit" component={ClubEdit} options={{ headerShown: false}} />
    </Stack.Navigator>
    );
}

export default ClubStackNavigation;