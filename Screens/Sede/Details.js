import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Details = ({ sede, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>DETALLES</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nombre de Sede:</Text>
        <Text style={styles.value}>{sede.NombreSede}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('SedeEditar', { idSede: sede.IdSede })}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
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
  editButton: {
    width: '45%',
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#ffc107',
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

export default Details;