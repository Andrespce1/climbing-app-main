// OtroComponente.js
import React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MostrarPDF from './MostrarPDF';

const Stack = createStackNavigator();

const OtroComponente = () => {
  const pdfUri = 'https://ejemplo.com/ejemplo.pdf'; // Reemplaza con la URI real del PDF

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="OtroComponente" component={OtroComponenteScreen} />
        <Stack.Screen name="MostrarPDF" component={MostrarPDF} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  const navegarAMostrarPDF = () => {
    navigation.navigate('MostrarPDF', { pdfUri });
  };

  return (
    <View>
      <Button title="Mostrar PDF" onPress={navegarAMostrarPDF} />
    </View>
  );
};