import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const Create = ({ navigation, onSubmit }) => {
  const [nombreSede, setNombreSede] = useState('');

  const handleSubmit = () => {
    const sede = {
      NombreSede: nombreSede,
    };
    onSubmit(sede);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CREAR</Text>
      <Text style={styles.subtitle}>Sede</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nombre de Sede:</Text>
        <TextInput
          style={styles.input}
          value={nombreSede}
          onChangeText={(text) => setNombreSede(text)}
        />
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