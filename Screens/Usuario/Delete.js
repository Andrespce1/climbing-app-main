import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

// Simulación de modelo de datos (reemplaza con tu fuente de datos real)
const usuario = {
  IdUsu: 1,
  NombreUsu: 'Nombre de Usuario de Ejemplo',
  ClaveUsu: 'Contraseña de Ejemplo',
  FechaCreacion: '2023-03-01',
  RolesUsu: 'Rol de Usuario de Ejemplo'
};

const Delete = ({ navigation }) => {
  const [usuarioData, setUsuarioData] = useState(usuario);

  const handleEliminar = () => {
    // Aquí debes implementar la lógica para eliminar al usuario
    // Por ahora, solo muestra un alert
    Alert.alert('Eliminar Usuario', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', onPress: () => console.log('Eliminar usuario con ID:', usuarioData.IdUsu) },
    ]);
  };

  const handleRegresar = () => {
    navigation.navigate('Index'); // Asegúrate de que 'Index' sea el nombre correcto de la pantalla de destino
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>ELIMINAR</Text>
      <Text style={styles.subtitulo}>¿Estás seguro de eliminar a este Usuario?</Text>
      <View style={styles.detalleContainer}>
        <Text style={styles.etiqueta}>Nombre de Usuario</Text>
        <Text style={styles.valor}>{usuarioData.NombreUsu}</Text>
        <Text style={styles.etiqueta}>Contraseña</Text>
        <Text style={styles.valor}>{usuarioData.ClaveUsu}</Text>
        <Text style={styles.etiqueta}>Fecha de Creación</Text>
        <Text style={styles.valor}>{usuarioData.FechaCreacion}</Text>
        <Text style={styles.etiqueta}>Roles</Text>
        <Text style={styles.valor}>{usuarioData.RolesUsu}</Text>
      </View>
      <View style={styles.botonesContainer}>
        <TouchableOpacity style={styles.botonEliminar} onPress={handleEliminar}>
          <Text style={styles.textoBoton}>Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonRegresar} onPress={handleRegresar}>
          <Text style={styles.textoBoton}>Regresar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 18,
    marginBottom: 20,
  },
  detalleContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  etiqueta: {
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
  botonEliminar: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  botonRegresar: {
    backgroundColor: '#6c757d',
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  textoBoton: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Delete;