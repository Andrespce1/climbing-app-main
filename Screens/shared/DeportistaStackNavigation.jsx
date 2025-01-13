import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// import DeportistaIndex from './../Deportista/Index';
import DeportistaIndex from '../Deportista/Index';
import CreateDeportista from '../Deportista/Create';
import EditDeportista from '../Deportista/Edit';
import DetailsDeportista from '../Deportista/Details';
import DeleteDeportista from '../Deportista/Delete';

const Stack = createNativeStackNavigator();

  const DeportistaStackNavigation = () => {

    return (
      <Stack.Navigator>
      {/* <Stack.Screen name="DeportistaIndex" component={DeportistaIndex} /> */}
      <Stack.Screen name="DeportistaIndex" component={DeportistaIndex} />
      <Stack.Screen name="CreateDeportista" component={CreateDeportista} />
      <Stack.Screen name="EditDeportista" component={EditDeportista} />
      <Stack.Screen name="DetailsDeportista" component={DetailsDeportista} />
      <Stack.Screen name="DeleteDeportista" component={DeleteDeportista} />
    </Stack.Navigator>
    );
}

export default DeportistaStackNavigation;