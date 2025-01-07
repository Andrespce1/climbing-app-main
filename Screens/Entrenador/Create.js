import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Picker } from 'react-native';
import { Button } from 'react-native-paper';

const Create = () => {
  const [nombresEnt, setNombresEnt] = useState('');
  const [apellidosEnt, setApellidosEnt] = useState('');
  const [cedulaEnt, setCedulaEnt] = useState('');
  const [idPro, setIdPro] = useState('');
  const [listaProvincias, setListaProvincias] = useState([
    { id: 1, nombre: 'Provincia 1' },
    { id: 2, nombre: 'Provincia 2' },
  ]);
  const [activoEnt, setActivoEnt] = useState('');
  const [listaEstados, setListaEstados] = useState([
    { id: 1, nombre: 'Activo' },
    { id: 2, nombre: 'Inactivo' },
  ]);

  const create = () => {
    // Aquí debes implementar la lógica para crear un nuevo entrenador
    // Puedes utilizar fetch o Axios para enviar los datos al servidor
    console.log('Crear entrenador:', {
      nombresEnt,
      apellidosEnt,
      cedulaEnt,
      idPro,
      activoEnt,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>CREAR ENTRENADOR</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nombres:</Text>
        <TextInput
          style={styles.input}
          value={nombresEnt}
          onChangeText={(text) => setNombresEnt(text)}
          placeholder="Ingrese los nombres del entrenador"
        />
        <Text style={styles.label}>Apellidos:</Text>
        <TextInput
          style={styles.input}
          value={apellidosEnt}
          onChangeText={(text) => setApellidosEnt(text)}
          placeholder="Ingrese los apellidos del entrenador"
        />
        <Text style={styles.label}>Cédula:</Text>
        <TextInput
          style={styles.input}
          value={cedulaEnt}
          onChangeText={(text) => setCedulaEnt(text)}
          placeholder="Ingrese la cédula del entrenador"
          keyboardType="numeric"
        />
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
          selectedValue={activoEnt}
          style={styles.picker}
          onValueChange={(itemValue) => setActivoEnt(itemValue)}
        >
          <Picker.Item label="--Elija un Estado--" value="" />
          {listaEstados.map((estado) => (
            <Picker.Item label={estado.nombre} value={estado.id} key={estado.id} />
          ))}
        </Picker>
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={create}>
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
    fontSize: 18,
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