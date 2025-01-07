import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Picker, StyleSheet } from 'react-native';

const Create = () => {
  const [puesto, setPuesto] = useState('');
  const [idDep, setIdDep] = useState('');
  const [idCom, setIdCom] = useState('');
  const [listaDeportistas, setListaDeportistas] = useState([]);
  const [listaCompetencias, setListaCompetencias] = useState([]);
  const [returnTo, setReturnTo] = useState('');

  // Simulando la carga de datos desde una API
  const loadListaDeportistas = async () => {
    // Llamar a la API para obtener deportistas
    const response = await fetch('https://tu-api.com/deportistas');
    const data = await response.json();
    setListaDeportistas(data.map((deportista) => ({ label: deportista.nombre, value: deportista.id })));
  };

  const loadListaCompetencias = async () => {
    // Llamar a la API para obtener competencias
    const response = await fetch('https://tu-api.com/competencias');
    const data = await response.json();
    setListaCompetencias(data.map((competencia) => ({ label: competencia.nombre, value: competencia.id })));
  };

  useEffect(() => {
    loadListaDeportistas();
    loadListaCompetencias();
  }, []);

  const handleCrear = () => {
    // Implementar lógica para crear el detalle de competencia
    console.log('Crear detalle de competencia:', { puesto, idDep, idCom });
  };

  const handleRegresar = () => {
    // Navegar a la pantalla de competencias
    console.log('Regresar a competencias');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CREAR</Text>
      <Text style={styles.subtitle}>Detalle de la Competencia</Text>
      <View style={styles.separator} />

      <View style={styles.formContainer}>
        <TextInput
          value={puesto}
          onChangeText={setPuesto}
          placeholder="Puesto"
          style={styles.input}
        />

        <Picker
          selectedValue={idDep}
          onValueChange={setIdDep}
          style={styles.picker}
        >
          <Picker.Item label="--Elija un Deportista--" value="" />
          {listaDeportistas.map((deportista) => (
            <Picker.Item key={deportista.value} label={deportista.label} value={deportista.value} />
          ))}
        </Picker>

        <Picker
          selectedValue={idCom}
          onValueChange={setIdCom}
          style={styles.picker}
        >
          <Picker.Item label="--Elija una Competencia--" value="" />
          {listaCompetencias.map((competencia) => (
            <Picker.Item key={competencia.value} label={competencia.label} value={competencia.value} />
          ))}
        </Picker>

        <View style={styles.buttonContainer}>
          <Button title="Crear" onPress={handleCrear} color="#007bff" style={styles.button} />
          <Button title="Regresar" onPress={handleRegresar} color="#dc3545" style={styles.button} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
    width: '100%',
  },
  formContainer: {
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '45%',
  },
});

export default Create;