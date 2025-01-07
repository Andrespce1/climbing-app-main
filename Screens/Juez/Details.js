import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';

const Details = ({ juez, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>DETALLES</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nombres</Text>
        <Text style={styles.value}>{juez.NombresJuez}</Text>
        <Text style={styles.label}>Apellidos</Text>
        <Text style={styles.value}>{juez.ApellidosJuez}</Text>
        <Text style={styles.label}>Cédula</Text>
        <Text style={styles.value}>{juez.CedulaJuez}</Text>
        <Text style={styles.label}>¿Es Juez Principal?</Text>
        <Text style={styles.value}>{juez.PrincipalJuez ? 'Sí' : 'No'}</Text>
        <Text style={styles.label}>Provincia</Text>
        <Text style={styles.value}>{juez.IdProNavigation.NombrePro}</Text>
        <Text style={styles.label}>Usuario</Text>
        <Text style={styles.value}>{juez.IdUsuNavigation.NombreUsu}</Text>
        <Text style={styles.label}>Estado</Text>
        <Text style={styles.value}>{juez.ActivoJuez ? 'Activo' : 'Inactivo'}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => navigation.navigate('EditarJuez', { idJuez: juez.IdJuez })}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
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
  button: {
    width: '45%',
    paddingVertical: 10,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: '#ffc107', // Color warning
  },
  cancelButton: {
    backgroundColor: '#dc3545', // Color danger
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Details;