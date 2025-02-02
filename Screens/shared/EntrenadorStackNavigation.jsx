import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// import EntrenadorIndex from './../Entrenador/Index';
import EntrenadorIndex from '../Entrenador/Index';
import CreateEntrenador from '../Entrenador/Create';
import EditEntrenador from '../Entrenador/Edit';
import DetailsEntrenador from '../Entrenador/Details';  
import DeleteEntrenador from '../Entrenador/Delete';

const Stack = createNativeStackNavigator();

  const EntrenadorStackNavigation = () => {

    return (
      <Stack.Navigator>
      {/* <Stack.Screen name="EntrenadorIndex" component={EntrenadorIndex} /> */}
      <Stack.Screen name="EntrenadorIndex" component={EntrenadorIndex} />
      <Stack.Screen name="CreateEntrenador" component={CreateEntrenador} />
      <Stack.Screen name="EditEntrenador" component={EditEntrenador} />
      <Stack.Screen name="DetailsEntrenador" component={DetailsEntrenador} />
      <Stack.Screen name="DeleteEntrenador" component={DeleteEntrenador} />
    </Stack.Navigator>
    );
}

export default EntrenadorStackNavigation;