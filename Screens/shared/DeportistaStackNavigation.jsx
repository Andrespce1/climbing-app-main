import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// import DeportistaIndex from './../Deportista/Index';
import DeportistaCreate from './../Deportista/Create';

const Stack = createNativeStackNavigator();

  const DeportistaStackNavigation = () => {

    return (
      <Stack.Navigator>
      {/* <Stack.Screen name="DeportistaIndex" component={DeportistaIndex} /> */}
      <Stack.Screen name="DeportistaCreate" component={DeportistaCreate} />
    </Stack.Navigator>
    );
}

export default DeportistaStackNavigation;