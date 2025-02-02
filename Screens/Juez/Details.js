import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation

const Details = ({ route }) => {
  const navigation = useNavigation(); // Inicializa la navegación
  const { juez } = route.params; // Desestructuramos el objeto juez desde los parámetros de la ruta

  // Verifica si el juez existe
  if (!juez) {
    return (
      <View style={styles.container}>
        <Text>No se encontró información del juez.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DETALLES</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nombres</Text>
        <Text style={styles.value}>{juez.nombresJuez}</Text>
        <Text style={styles.label}>Apellidos</Text>
        <Text style={styles.value}>{juez.apellidosJuez}</Text>
        <Text style={styles.label}>Cédula</Text>
        <Text style={styles.value}>{juez.cedulaJuez}</Text>
        <Text style={styles.label}>¿Es Juez Principal?</Text>
        <Text style={styles.value}>{juez.principalJuez ? 'Sí' : 'No'}</Text>
        <Text style={styles.label}>Provincia</Text>
        <Text style={styles.value}>{juez.idProNavigation?.nombrePro || 'No disponible'}</Text> {/* Manejo seguro */}
        <Text style={styles.label}>Usuario</Text>
        <Text style={styles.value}>{juez.idUsuNavigation?.nombreUsu || 'No disponible'}</Text> {/* Manejo seguro */}
        <Text style={styles.label}>Estado</Text>
        <Text style={styles.value}>{juez.activoJuez ? 'Activo' : 'Inactivo'}</Text>
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