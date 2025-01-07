import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

// Simulación de modelo de datos (reemplaza con tu fuente de datos real)
const usuario = {
  IdUsu: 1,
  NombreUsu: 'Nombre de Usuario de Ejemplo',
  ClaveUsu: 'Contraseña de Ejemplo',
  FechaCreacion: '2023-03-01',
  RolesUsu: 'Rol de Usuario de Ejemplo',
  ActivoUsu: true, // Estado del usuario (true para Activo, false para Inactivo)
};

const Details = ({ navigation }) => {
  const handleEditar = () => {
    navigation.navigate('EditarUsuario', { id: usuario.IdUsu }); // Asegúrate de que 'EditarUsuario' sea el nombre correcto de la pantalla de destino
  };

  const handleRegresar = () => {
    navigation.navigate('Index'); // Asegúrate de que 'Index' sea el nombre correcto de la pantalla de destino
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>DETALLES</Text>
      <View style={styles.detalleContainer}>
        <Text style={styles.etiqueta}>Nombre de Usuario</Text>
        <Text style={styles.valor}>{usuario.NombreUsu}</Text>
        <Text style={styles.etiqueta}>Contraseña</Text>
        <Text style={styles.valor}>{usuario.ClaveUsu}</Text>
        <Text style={styles.etiqueta}>Fecha de Creación</Text>
        <Text style={styles.valor}>{usuario.FechaCreacion}</Text>
        <Text style={styles.etiqueta}>Roles</Text>
        <Text style={styles.valor}>{usuario.RolesUsu}</Text>
        <Text style={styles.etiqueta}>Estado</Text>
        <Text style={styles.valor}>{usuario.ActivoUsu ? 'Activo' : 'Inactivo'}</Text>
      </View>
      <View style={styles.botonesContainer}>
        <TouchableOpacity style={styles.botonEditar} onPress={handleEditar}>
          <Text style={styles.textoBoton}>Editar</Text>
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
  botonEditar: {
    backgroundColor: '#ffc107', // Color warning
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  botonRegresar: {
    backgroundColor: '#6c757d', // Color danger
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  textoBoton: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Details;