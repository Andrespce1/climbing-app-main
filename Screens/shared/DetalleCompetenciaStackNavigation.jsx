import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import DetalleCompetenciaIndex from '../DetalleCompetencia/Index';
import DetalleCompetenciaCreate from '../DetalleCompetencia/Create';
import DetalleCompetenciaDelete from '../DetalleCompetencia/Delete';
import DetalleCompetenciaDetails from '../DetalleCompetencia/Details';
import DetalleCompetenciaEdit from '../DetalleCompetencia/Edit';
import DetalleCompetenciaResultados from '../DetalleCompetencia/Resultados';
import DetalleCompetenciaMostrarPDFNuevaPagina from '../DetalleCompetencia/MostrarPDFNuevaPagina';
import DetalleCompetenciaMostrarPDFNuevaPaginaFinal from '../DetalleCompetencia/MostrarPDFNuevaPaginaFinal';
import VistaPDFListaResultados from '../DetalleCompetencia/VistaPDFListaResultados';
import VistaPDFListaResultadosFinal from '../DetalleCompetencia/VistaPDFListaResultadosFinal';

const Stack = createNativeStackNavigator();

const DetalleCompetenciaStackNavigation = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="DetalleCompetenciaIndex" component={DetalleCompetenciaIndex} options={{ headerShown: false }} />
            <Stack.Screen name="DetalleCompetenciaCreate" component={DetalleCompetenciaCreate} options={{ headerShown: false }} />
            <Stack.Screen name="DetalleCompetenciaDelete" component={DetalleCompetenciaDelete} options={{ headerShown: false }} />
            <Stack.Screen name="DetalleCompetenciaDetails" component={DetalleCompetenciaDetails} options={{ headerShown: false }} />
            <Stack.Screen name="DetalleCompetenciaEdit" component={DetalleCompetenciaEdit} options={{ headerShown: false }} />
            <Stack.Screen name="DetalleCompetenciaResultados" component={DetalleCompetenciaResultados} options={{ headerShown: false }} />
            <Stack.Screen name="DetalleCompetenciaMostrarPDFNuevaPagina" component={DetalleCompetenciaMostrarPDFNuevaPagina} options={{ headerShown: false }} />
            <Stack.Screen name="DetalleCompetenciaMostrarPDFNuevaPaginaFinal" component={DetalleCompetenciaMostrarPDFNuevaPaginaFinal} options={{ headerShown: false }} />
            <Stack.Screen name="VistaPDFListaResultados" component={VistaPDFListaResultados} options={{ headerShown: false }} />
            <Stack.Screen name="VistaPDFListaResultadosFinal" component={VistaPDFListaResultadosFinal} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default DetalleCompetenciaStackNavigation;