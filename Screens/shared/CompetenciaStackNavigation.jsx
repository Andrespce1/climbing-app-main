import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import CompetenciaIndex from '../Competencia/Index';
import CompetenciaCreate from '../Competencia/Create';
import CompetenciaDelete from '../Competencia/Delete';
import CompetenciaDetails from '../Competencia/Details';
import CompetenciaEdit from '../Competencia/Edit';
import CompetenciaResultados from '../Competencia/Resultados';
import CompetenciaAgregarResultados from '../Competencia/AgregarResultados';

const Stack = createNativeStackNavigator();

const CompetenciaStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CompetenciaIndex" component={CompetenciaIndex} options={{ headerShown: false }} />
      <Stack.Screen name="CompetenciaCreate" component={CompetenciaCreate} options={{ headerShown: false }} />
      <Stack.Screen name="CompetenciaDelete" component={CompetenciaDelete} options={{ headerShown: false }} />
      <Stack.Screen name="CompetenciaDetails" component={CompetenciaDetails} options={{ headerShown: false }} />
      <Stack.Screen name="CompetenciaEdit" component={CompetenciaEdit} options={{ headerShown: false }} />
      <Stack.Screen name="CompetenciaResultados" component={CompetenciaResultados} options={{ headerShown: false }} />
      <Stack.Screen name="CompetenciaAgregarResultados" component={CompetenciaAgregarResultados} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default CompetenciaStackNavigation;