//importar react
import React from 'react';
//Importar macro para crear stack de navegacion
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Importar pantallas o screens
import CompetenciaIndex from './../Competencia/Index';

//llamar al macro que crea el stack de navegacion
const Stack = createNativeStackNavigator();

//Crear Componente CompentenciaStackNavigation
const CompentenciaStackNavigation=()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="CompetenciaIndex" component={CompetenciaIndex} />   
        </Stack.Navigator>
    );
}

export default CompentenciaStackNavigation;