import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

// Asumiendo que estás usando React Navigation para la navegación
import { useNavigation } from '@react-navigation/native';

const Delete = ({ route }) => {
  const { competencia } = route.params; // Asumiendo que pasas el modelo como parámetro de navegación
  const navigation = useNavigation();

  const handleDeshabilitar = () => {
    Alert.alert(
      '¿Está seguro de deshabilitarlo?',
      'No se podrá revertir!',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancelar Pressed'),
          style: 'cancel',
        },
        {
          text: 'Deshabilitar',
          onPress: () => {
            // Lógica para deshabilitar la competencia (API call, etc.)
            console.log('Deshabilitar Pressed');
            // Navegar de regreso o mostrar mensaje de éxito
            navigation.goBack();
            Alert.alert('Deshabilitado con éxito!');
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>DESHABILITAR</Text>
      <Text style={styles.subtitulo}>¿Estás seguro de deshabilitar esta Competencia?</Text>
      <View style={styles.detalleContainer}>
        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.valor}>{competencia.NombreCom}</Text>

        <Text style={styles.label}>Fecha de Inicio</Text>
        <Text style={styles.valor}>{competencia.FechaInicioCom}</Text>

        <Text style={styles.label}>Fecha de Fin</Text>
        <Text style={styles.valor}>{competencia.FechaFinCom}</Text>

        <Text style={styles.label}>Categoría</Text>
        <Text style={styles.valor}>{competencia.IdCatNavigation.NombreCat}</Text>

        <Text style={styles.label}>Género</Text>
        <Text style={styles.valor}>{competencia.IdGenNavigation.NombreGen}</Text>

        <Text style={styles.label}>Juez</Text>
        <Text style={styles.valor}>{competencia.IdJuezNavigation.NombresJuez} {competencia.IdJuezNavigation.ApellidosJuez}</Text>

        <Text style={styles.label}>Modalidad</Text>
        <Text style={styles.valor}>{competencia.IdModNavigation.DescripcionMod}</Text>

        <Text style={styles.label}>Sede</Text>
        <Text style={styles.valor}>{competencia.IdSedeNavigation.NombreSede}</Text>

        <Text style={styles.label}>Estado</Text>
        <Text style={styles.valor}>{competencia.ActivoCom}</Text>
      </View>

      <View style={styles.botonesContainer}>
        <TouchableOpacity style={styles.botonDeshabilitar} onPress={handleDeshabilitar}>
          <Text style={styles.textoBoton}>Deshabilitar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonRegresar} onPress={() => navigation.goBack()}>
          <Text style={styles.textoBoton}>Regresar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  detalleContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  valor: {
    fontSize: 16,
    marginBottom: 15,
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botonDeshabilitar: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  botonRegresar: {
    backgroundColor: '#f00',
    padding: 10,
    borderRadius: 5,
  },
  textoBoton: {
    fontSize: 16,
    color: '#fff',
  },
});

export default Delete;