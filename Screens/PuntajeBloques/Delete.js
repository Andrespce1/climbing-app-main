import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Alert } from 'react-native';

const Delete = ({ puntajeBloque, navigation, onDelete }) => {
  const handleDelete = () => {
    Alert.alert(
      'Eliminar Puntaje de Bloque',
      '¿Estás seguro de eliminar este puntaje de bloque?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => onDelete(puntajeBloque.IdBloPts),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eliminar Puntaje de Bloque</Text>
      <Text style={styles.subtitle}>¿Estás seguro de eliminar este puntaje de bloque?</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Número de Bloque:</Text>
        <Text style={styles.value}>{puntajeBloque.NumeroBloque}</Text>
        <Text style={styles.label}>Intentos Tops:</Text>
        <Text style={styles.value}>{puntajeBloque.IntentosTops}</Text>
        <Text style={styles.label}>Intentos Zonas:</Text>
        <Text style={styles.value}>{puntajeBloque.IntentosZonas}</Text>
        <Text style={styles.label}>Etapa:</Text>
        <Text style={styles.value}>{puntajeBloque.Etapa}</Text>
        <Text style={styles.label}>Comunidad:</Text>
        <Text style={styles.value}>{puntajeBloque.IdComNavigation.IdCom}</Text>
        <Text style={styles.label}>Deporte:</Text>
        <Text style={styles.value}>{puntajeBloque.IdDepNavigation.IdDep}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Volver a la lista</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteButton: {
    width: '45%',
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#dc3545',
  },
  cancelButton: {
    width: '45%',
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Delete;