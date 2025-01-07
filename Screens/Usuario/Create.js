import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Picker, TouchableOpacity } from 'react-native';

const Create = ({ navigation, onSubmit, listadoRoles, listadoEstados }) => {
  const [nombreUsu, setNombreUsu] = useState('');
  const [claveUsu, setClaveUsu] = useState('');
  const [fechaCreacion, setFechaCreacion] = useState('');
  const [rolesUsu, setRolesUsu] = useState('');
  const [activoUsu, setActivoUsu] = useState('');

  const handleSubmit = () => {
    const usuario = {
      NombreUsu: nombreUsu,
      ClaveUsu: claveUsu,
      FechaCreacion: fechaCreacion,
      RolesUsu: rolesUsu,
      ActivoUsu: activoUsu,
    };
    onSubmit(usuario);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CREAR</Text>
      <Text style={styles.subtitle}>Usuario</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nombre de Usuario:</Text>
        <TextInput
          style={styles.input}
          value={nombreUsu}
          onChangeText={(text) => setNombreUsu(text)}
        />
        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          value={claveUsu}
          onChangeText={(text) => setClaveUsu(text)}
          secureTextEntry={true}
        />
        <Text style={styles.label}>Fecha de Creación:</Text>
        <TextInput
          style={styles.input}
          value={fechaCreacion}
          onChangeText={(text) => setFechaCreacion(text)}
        />
        <Text style={styles.label}>Roles:</Text>
        <Picker
          selectedValue={rolesUsu}
          onValueChange={(itemValue) => setRolesUsu(itemValue)}
        >
          <Picker.Item label="--Elija un Rol" value="" />
          {listadoRoles.map((rol) => (
            <Picker.Item key={rol.value} label={rol.label} value={rol.value} />
          ))}
        </Picker>
        <Text style={styles.label}>Estado:</Text>
        <Picker
          selectedValue={activoUsu}
          onValueChange={(itemValue) => setActivoUsu(itemValue)}
        >
          <Picker.Item label="--Elija un Estado" value="" />
          {listadoEstados.map((estado) => (
            <Picker.Item key={estado.value} label={estado.label} value={estado.value} />
          ))}
        </Picker>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Crear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Regresar</Text>
          </TouchableOpacity>
        </View>
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
  formContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
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
    backgroundColor: '#007bff',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Create;