import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Alert } from 'react-native';

const Delete = ({ sede, navigation, onDelete }) => {
  const handleDelete = () => {
    Alert.alert(
      'Eliminar Sede',
      '¿Estás seguro de eliminar esta sede?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => onDelete(sede.IdSede),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ELIMINAR</Text>
      <Text style={styles.subtitle}>¿Estás seguro de eliminar esta Sede?</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nombre de Sede:</Text>
        <Text style={styles.value}>{sede.NombreSede}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Regresar</Text>
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
    backgroundColor: '#6c757d',
  },
  cancelButton: {
    width: '45%',
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#dc3545',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Delete;