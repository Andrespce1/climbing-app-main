import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Picker } from 'react-native';
import { Button } from 'react-native-paper';

const Create = () => {
  const [nombresJuez, setNombresJuez] = useState('');
  const [apellidosJuez, setApellidosJuez] = useState('');
  const [cedulaJuez, setCedulaJuez] = useState('');
  const [principalJuez, setPrincipalJuez] = useState('');
  const [listaEstados, setListaEstados] = useState([
    { id: 1, nombre: 'Sí' },
    { id: 2, nombre: 'No' },
  ]);
  const [idPro, setIdPro] = useState('');
  const [listaProvincias, setListaProvincias] = useState([
    { id: 1, nombre: 'Provincia 1' },
    { id: 2, nombre: 'Provincia 2' },
  ]);
  const [activoJuez, setActivoJuez] = useState('');
  const [listaEstados2, setListaEstados2] = useState([
    { id: 1, nombre: 'Activo' },
    { id: 2, nombre: 'Inactivo' },
  ]);

  const Create = () => {
    // Aquí debes implementar la lógica para crear un nuevo juez
    // Puedes utilizar fetch o Axios para enviar los datos al servidor
    console.log('Crear juez:', {
      nombresJuez,
      apellidosJuez,
      cedulaJuez,
      principalJuez,
      idPro,
      activoJuez,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>CREAR JUEZ</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nombres:</Text>
        <TextInput
          style={styles.input}
          value={nombresJuez}
          onChangeText={(text) => setNombresJuez(text)}
          placeholder="Ingrese los nombres del juez"
        />
        <Text style={styles.label}>Apellidos:</Text>
        <TextInput
          style={styles.input}
          value={apellidosJuez}
          onChangeText={(text) => setApellidosJuez(text)}
          placeholder="Ingrese los apellidos del juez"
        />
        <Text style={styles.label}>Cédula:</Text>
        <TextInput
          style={styles.input}
          value={cedulaJuez}
          onChangeText={(text) => setCedulaJuez(text)}
          placeholder="Ingrese la cédula del juez"
          keyboardType="numeric"
        />
        <Text style={styles.label}>¿Es juez Principal?</Text>
        <Picker
          selectedValue={principalJuez}
          style={styles.picker}
          onValueChange={(itemValue) => setPrincipalJuez(itemValue)}
        >
          <Picker.Item label="--Elija la opción--" value="" />
          {listaEstados.map((estado) => (
            <Picker.Item label={estado.nombre} value={estado.id} key={estado.id} />
          ))}
        </Picker>
        <Text style={styles.label}>Provincia:</Text>
        <Picker
          selectedValue={idPro}
          style={styles.picker}
          onValueChange={(itemValue) => setIdPro(itemValue)}
        >
          <Picker.Item label="--Elija una Provincia--" value="" />
          {listaProvincias.map((provincia) => (
            <Picker.Item label={provincia.nombre} value={provincia.id} key={provincia.id} />
          ))}
        </Picker>
        <Text style={styles.label}>Estado:</Text>
        <Picker
          selectedValue={activoJuez}
          style={styles.picker}
          onValueChange={(itemValue) => setActivoJuez(itemValue)}
        >
          <Picker.Item label="--Elija un Estado--" value="" />
          {listaEstados2.map((estado) => (
            <Picker.Item label={estado.nombre} value={estado.id} key={estado.id} />
          ))}
        </Picker>
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={Create}>
            Crear
          </Button>
          <Button mode="outlined" onPress={() => console.log('Regresar')}>
            Regresar
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  picker: {
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default Create;