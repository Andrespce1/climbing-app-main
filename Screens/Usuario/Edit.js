import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Picker } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

// Simulación de modelo de datos (reemplaza con tu fuente de datos real)
const usuario = {
  IdUsu: 1,
  NombreUsu: 'Nombre de Usuario de Ejemplo',
  ClaveUsu: 'Contraseña de Ejemplo',
  FechaCreacion: '2023-03-01',
  RolesUsu: 'Rol de Usuario de Ejemplo',
  ActivoUsu: true, // Estado del usuario (true para Activo, false para Inactivo)
};

// Simulación de listados para selects (reemplaza con tu fuente de datos real)
const listadoRoles = [
  { label: 'Rol 1', value: 'Rol 1' },
  { label: 'Rol 2', value: 'Rol 2' },
  { label: 'Rol 3', value: 'Rol 3' },
];

const listadoEstados = [
  { label: 'Activo', value: true },
  { label: 'Inactivo', value: false },
];

const Edit = ({ navigation }) => {
  const [nombreUsu, setNombreUsu] = useState(usuario.NombreUsu);
  const [claveUsu, setClaveUsu] = useState(usuario.ClaveUsu);
  const [fechaCreacion, setFechaCreacion] = useState(usuario.FechaCreacion);
  const [rolesUsu, setRolesUsu] = useState(usuario.RolesUsu);
  const [activoUsu, setActivoUsu] = useState(usuario.ActivoUsu);

  const handleGuardar = () => {
    // Aquí debes implementar la lógica para guardar los cambios
    // Por ahora, solo muestra un alert con los datos actuales
    Alert.alert('Guardar Cambios', `Nombre: ${nombreUsu}\nContraseña: ${claveUsu}\nFecha Creación: ${fechaCreacion}\nRol: ${rolesUsu}\nEstado: ${activoUsu ? 'Activo' : 'Inactivo'}`);
  };

  const handleRegresar = () => {
    navigation.navigate('Index'); // Asegúrate de que 'Index' sea el nombre correcto de la pantalla de destino
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>EDITAR</Text>
      <View style={styles.formContainer}>
        <TextInput
          label="Nombre de Usuario"
          value={nombreUsu}
          onChangeText={(text) => setNombreUsu(text)}
          style={styles.input}
        />
        <TextInput
          label="Contraseña"
          value={claveUsu}
          onChangeText={(text) => setClaveUsu(text)}
          secureTextEntry={true}
          style={styles.input}
        />
        <TextInput
          label="Fecha de Creación"
          value={fechaCreacion}
          onChangeText={(text) => setFechaCreacion(text)}
          style={styles.input}
        />
        <Text style={styles.label}>Roles</Text>
        <Picker
          selectedValue={rolesUsu}
          onValueChange={(itemValue) => setRolesUsu(itemValue)}
          style={styles.select}
        >
          <Picker.Item label="--Elija un Rol--" value="" />
          {listadoRoles.map((rol, index) => (
            <Picker.Item key={index} label={rol.label} value={rol.value} />
          ))}
        </Picker>
        <Text style={styles.label}>Estado</Text>
        <Picker
          selectedValue={activoUsu}
          onValueChange={(itemValue) => setActivoUsu(itemValue)}
          style={styles.select}
        >
          <Picker.Item label="--Elija un Estado--" value="" />
          {listadoEstados.map((estado, index) => (
            <Picker.Item key={index} label={estado.label} value={estado.value} />
          ))}
        </Picker>
        <View style={styles.botonesContainer}>
          <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardar}>
            <Text style={styles.textoBoton}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botonRegresar} onPress={handleRegresar}>
            <Text style={styles.textoBoton}>Regresar</Text>
          </TouchableOpacity>
        </View>
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
  formContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 5,
  },
  input: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  select: {
    width: '100%',
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botonGuardar: {
    backgroundColor: '#007bff', // Color primary
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  botonRegresar: {
    backgroundColor: '#6c757d', // Color secondary
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  textoBoton: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Edit;