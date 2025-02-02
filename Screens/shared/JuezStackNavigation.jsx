import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// import JuezIndex from './../Juez/Index';
import JuezIndex from '../Juez/Index';
import CreateJuez from '../Juez/Create';
import EditJuez from '../Juez/Edit';
import DetailsJuez from '../Juez/Details';
import DeleteJuez from '../Juez/Delete';

const Stack = createNativeStackNavigator();

  const JuezStackNavigation = () => {

    return (
      <Stack.Navigator>
      {/* <Stack.Screen name="JuezIndex" component={JuezIndex} /> */}
      <Stack.Screen name="JuezIndex" component={JuezIndex} />
      <Stack.Screen name="CreateJuez" component={CreateJuez} />
      <Stack.Screen name="EditJuez" component={EditJuez} />
      <Stack.Screen name="DetailsJuez" component={DetailsJuez} />
      <Stack.Screen name="DeleteJuez" component={DeleteJuez} />
    </Stack.Navigator>
    );
}

export default JuezStackNavigation;