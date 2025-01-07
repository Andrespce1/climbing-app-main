import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Details = ({ navigation, route }) => {
  const entrenador = route.params.entrenador;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>DETALLES</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nombres:</Text>
        <Text style={styles.value}>{entrenador.NombresEnt}</Text>
        <Text style={styles.label}>Apellidos:</Text>
        <Text style={styles.value}>{entrenador.ApellidosEnt}</Text>
        <Text style={styles.label}>Cédula:</Text>
        <Text style={styles.value}>{entrenador.CedulaEnt}</Text>
        <Text style={styles.label}>Provincia:</Text>
        <Text style={styles.value}>{entrenador.IdProNavigation.NombrePro}</Text>
        <Text style={styles.label}>Usuario:</Text>
        <Text style={styles.value}>{entrenador.IdUsuNavigation.NombreUsu}</Text>
        <Text style={styles.label}>Estado:</Text>
        <Text style={styles.value}>{entrenador.ActivoEnt}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="outlined" onPress={() => navigation.navigate('EditarEntrenador', { entrenador })}>
          Editar
        </Button>
        <Button mode="outlined" onPress={() => navigation.navigate('Index')}>
          Regresar
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default Details;