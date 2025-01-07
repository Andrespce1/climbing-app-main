import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';

const Edit = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [club, setClub] = useState({
    id: route.params.idClub,
    nombre: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de carga de datos (reemplaza con tu lógica de API)
    const clubData = {
      id: route.params.idClub,
      nombre: 'Club Ejemplo', // Carga el nombre del club desde tu API
    };
    setClub(clubData);
    setLoading(false);
  }, []);

  const handleGuardar = () => {
    if (club.nombre === '') {
      setError('Ingrese un nombre para el club');
    } else {
      // Lógica para guardar el club (p. ej., API call)
      console.log('Guardar club:', club);
      // Navegar a otra pantalla después de guardar (opcional)
      // navigation.navigate('Clubs');
      setError(null); // Limpiar error después de guardar exitoso
    }
  };

  const handleRegresar = () => {
    navigation.goBack(); // Regresar a la pantalla anterior
  };

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>EDITAR</Text>
      <View style={styles.formContainer}>
        <Text style={styles.formTitulo}>Club</Text>
        <View style={styles.hr} />
        <TextInput
          style={styles.input}
          placeholder="Nombre del Club"
          value={club.nombre}
          onChangeText={(text) => setClub({ ...club, nombre: text })}
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <View style={styles.botonesContainer}>
          <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardar}>
            <Text style={styles.botonTexto}>Guardar</Text>
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
  formContainer: {
    width: '100%',
  },
  formTitulo: {
    fontSize: 18,
    marginBottom: 10,
  },
  hr: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 10,
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
    width: '100%',
    marginTop: 20,
  },
  botonGuardar: {
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

export default Edit;