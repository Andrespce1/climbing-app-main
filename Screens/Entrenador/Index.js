import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button } from 'react-native';
import { TouchableOpacity } from 'react-native';

const Index = () => {
  const [entrenadores, setEntrenadores] = useState([]);
  const [searchFor, setSearchFor] = useState('');

  useEffect(() => {
    // Aquí debes implementar la lógica para obtener la lista de entrenadores desde el servidor
    // Puedes utilizar fetch o Axios para obtener los datos
    const entrenadoresMock = [
      { id: 1, nombres: 'Juan', apellidos: 'Pérez', cedula: '1234567890', provincia: 'Provincia 1', usuario: 'Usuario 1', estado: true },
      { id: 2, nombres: 'María', apellidos: 'Gómez', cedula: '9876543210', provincia: 'Provincia 2', usuario: 'Usuario 2', estado: false },
    ];
    setEntrenadores(entrenadoresMock);
  }, []);

  const handleSearch = (text) => {
    setSearchFor(text);
    // Aquí debes implementar la lógica para buscar entrenadores según el texto ingresado
    // Puedes utilizar filter para filtrar la lista de entrenadores
    const entrenadoresFiltrados = entrenadores.filter((entrenador) =>
      entrenador.nombres.toLowerCase().includes(text.toLowerCase()) ||
      entrenador.apellidos.toLowerCase().includes(text.toLowerCase()) ||
      entrenador.cedula.includes(text)
    );
    setEntrenadores(entrenadoresFiltrados);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.label}>Nombres:</Text>
      <Text style={styles.value}>{item.nombres}</Text>
      <Text style={styles.label}>Apellidos:</Text>
      <Text style={styles.value}>{item.apellidos}</Text>
      <Text style={styles.label}>Cédula:</Text>
      <Text style={styles.value}>{item.cedula}</Text>
      <Text style={styles.label}>Provincia:</Text>
      <Text style={styles.value}>{item.provincia}</Text>
      <Text style={styles.label}>Usuario:</Text>
      <Text style={styles.value}>{item.usuario}</Text>
      <Text style={styles.label}>Estado:</Text>
      <Text style={styles.value}>{item.estado ? 'Activo' : 'Inactivo'}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => console.log('Editar', item.id)}>
          <Text style={styles.button}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Detalles', item.id)}>
          <Text style={styles.button}>Detalles</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Deshabilitar', item.id)}>
          <Text style={styles.button}>Deshabilitar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LISTA DE ENTRENADORES</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchFor}
          onChangeText={(text) => handleSearch(text)}
          placeholder="Buscar..."
        />
        <Button title="Buscar" onPress={() => handleSearch(searchFor)} />
      </View>
      <FlatList
        data={entrenadores}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.createButtonContainer}>
        <TouchableOpacity onPress={() => console.log('Crear')}>
          <Text style={styles.createButton}>Crear</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '80%',
  },
  item: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  createButtonContainer: {
    marginBottom: 20,
  },
  createButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
});

export default Index;