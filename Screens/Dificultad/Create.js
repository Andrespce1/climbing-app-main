import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Create = () => {
  const [detalleCompetencia, setDetalleCompetencia] = useState([]);
  const [listaDeportistas, setListaDeportistas] = useState([
    { label: 'Deportista 1', value: 1 },
    { label: 'Deportista 2', value: 2 },
    // Agrega más deportistas según sea necesario
  ]);
  const [compe, setCompe] = useState('Competencia');

  const handleAgregarFila = () => {
    setDetalleCompetencia([...detalleCompetencia, { IdDep: '', IdCom: compe }]);
  };

  const handleEliminarFila = (index) => {
    setDetalleCompetencia(detalleCompetencia.filter((item, i) => i !== index));
  };

  const handleCrear = () => {
    // Implementar lógica para crear el detalle de competencia
    console.log('Crear detalle de competencia:', detalleCompetencia);
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

      <View style={styles.buttonContainer}>
        <Button title="Agregar Fila" onPress={handleAgregarFila} color="#34C759" style={styles.button} />
      </View>

      <FlatList
        data={detalleCompetencia}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <Picker
              selectedValue={item.IdDep}
              onValueChange={(value) => {
                setDetalleCompetencia(
                  detalleCompetencia.map((item, i) => (i === index ? { ...item, IdDep: value } : item))
                );
              }}
              style={styles.picker}
            >
              <Picker.Item label="--Elija un Deportista--" value="" />
              {listaDeportistas.map((deportista) => (
                <Picker.Item key={deportista.value} label={deportista.label} value={deportista.value} />
              ))}
            </Picker>
            <TextInput
              value={compe}
              editable={false}
              style={styles.input}
            />
            <Button title="Eliminar" onPress={() => handleEliminarFila(index)} color="#FF0000" style={styles.button} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={styles.buttonContainer}>
        <Button title="Crear" onPress={handleCrear} color="#007bff" style={styles.button} />
        <Button title="Regresar" onPress={handleRegresar} color="#dc3545" style={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    width: '45%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  picker: {
    width: '40%',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '40%',
    paddingHorizontal: 10,
  },
});

export default Create;