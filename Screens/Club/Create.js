import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const Create = () => {
  const navigation = useNavigation();
  const [nombreClub, setNombreClub] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    if (nombreClub === '') {
      setError('Ingrese un nombre para el club');
    } else {
      // Lógica para enviar el formulario (p. ej., API call)
      console.log('Formulario enviado:', { NombreClub: nombreClub });
      // Navegar a otra pantalla después de enviar (opcional)
      // navigation.navigate(' Clubs');
      setError(null); // Limpiar error después de envío exitoso
    }
  };

  const handleRegresar = () => {
    navigation.goBack(); // Regresar a la pantalla anterior
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>CREAR</Text>
      <Text style={styles.subtitulo}>Club</Text>
      <View style={styles.hr} />
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del Club"
          value={nombreClub}
          onChangeText={(text) => setNombreClub(text)}
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <View style={styles.botonesContainer}>
          <TouchableOpacity style={styles.botonCrear} onPress={handleSubmit}>
            <Text style={styles.botonTexto}>Crear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botonRegresar} onPress={handleRegresar}>
            <Text style={styles.botonTexto}>Regresar</Text>
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
    alignItems: 'center',
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
  hr: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botonCrear: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  botonRegresar: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Create;