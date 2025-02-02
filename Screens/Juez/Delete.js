import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios'; // Para realizar llamadas a la API

const Delete = ({ route, navigation }) => {
  const { juez } = route.params; // Asegúrate de que el juez se pasa correctamente

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    Alert.alert(
      '¿Está seguro de Deshabilitarlo?',
      "No se podrá revertir!",
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Deshabilitar',
          onPress: async () => {
            setIsSubmitting(true);
            try {
              // Realiza la llamada a la API para deshabilitar al juez
              await axios.delete(`http://tu-api.com/api/Juez/${juez.IdJuez}`);
              Alert.alert('Deshabilitado!', '', [{ text: 'OK', onPress: () => navigation.goBack() }]);
            } catch (error) {
              console.error('Error al deshabilitar el juez:', error);
              Alert.alert('Error', 'No se pudo deshabilitar al juez. Intenta nuevamente.');
            } finally {
              setIsSubmitting(false);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DESHABILITAR</Text>
      <Text style={styles.subtitle}>¿Estás seguro de deshabilitar a este Juez?</Text>
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
        <Text style={styles.value}>{juez.IdProNavigation?.NombrePro || 'N/A'}</Text>
        <Text style={styles.label}>Usuario</Text>
        <Text style={styles.value}>{juez.IdUsuNavigation?.NombreUsu || 'N/A'}</Text>
        <Text style={styles.label}>Estado</Text>
        <Text style={styles.value}>{juez.ActivoJuez ? 'Activo' : 'Inactivo'}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>Deshabilitar</Text>
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
  button: {
    width: '45%',
    paddingVertical: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#d33',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Delete;
