import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Linking } from 'react-native';

const Index = ({ navigation }) => {
  const [jueces, setJueces] = useState([]);
  const [searchFor, setSearchFor] = useState('');
  const [filteredJueces, setFilteredJueces] = useState([]);

  useEffect(() => {
    // Lógica para obtener la lista de jueces desde la API o base de datos
    const juecesDummy = [
      { IdJuez: 1, NombresJuez: 'Juan', ApellidosJuez: 'Pérez', CedulaJuez: '1234567890', PrincipalJuez: true, IdProNavigation: { NombrePro: 'Provincia 1' }, IdUsuNavigation: { NombreUsu: 'Usuario 1' }, ActivoJuez: true },
      { IdJuez: 2, NombresJuez: 'María', ApellidosJuez: 'González', CedulaJuez: '9876543210', PrincipalJuez: false, IdProNavigation: { NombrePro: 'Provincia 2' }, IdUsuNavigation: { NombreUsu: 'Usuario 2' }, ActivoJuez: false },
    ];
    setJueces(juecesDummy);
    setFilteredJueces(juecesDummy);
  }, []);

  const handleSearch = (text) => {
    setSearchFor(text);
    const filteredJueces = jueces.filter((juez) => {
      return (
        juez.NombresJuez.toLowerCase().includes(text.toLowerCase()) ||
        juez.ApellidosJuez.toLowerCase().includes(text.toLowerCase()) ||
        juez.CedulaJuez.toLowerCase().includes(text.toLowerCase())
      );
    });
    setFilteredJueces(filteredJueces);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.label}>Nombres:</Text>
      <Text style={styles.value}>{item.NombresJuez}</Text>
      <Text style={styles.label}>Apellidos:</Text>
      <Text style={styles.value}>{item.ApellidosJuez}</Text>
      <Text style={styles.label}>Cédula:</Text>
      <Text style={styles.value}>{item.CedulaJuez}</Text>
      <Text style={styles.label}>Juez Principal:</Text>
      <Text style={styles.value}>{item.PrincipalJuez ? 'Sí' : 'No'}</Text>
      <Text style={styles.label}>Provincia:</Text>
      <Text style={styles.value}>{item.IdProNavigation.NombrePro}</Text>
      <Text style={styles.label}>Usuario:</Text>
      <Text style={styles.value}>{item.IdUsuNavigation.NombreUsu}</Text>
      <Text style={styles.label}>Estado:</Text>
      <Text style={styles.value}>{item.ActivoJuez ? 'Activo' : 'Inactivo'}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EditarJuez', { idJuez: item.IdJuez })}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DetallesJuez', { idJuez: item.IdJuez })}
        >
          <Text style={styles.buttonText}>Detalles</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DeshabilitarJuez', { idJuez: item.IdJuez })}
        >
          <Text style={styles.buttonText}>Deshabilitar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LISTADO DE JUECES</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CrearJuez')}
      >
        <Text style={styles.buttonText}>Crear</Text>
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
          value={searchFor}
          onChangeText={(text) => handleSearch(text)}
        />
      </View>
      <FlatList
        data={filteredJueces}
        renderItem={renderItem}
        keyExtractor={(item) => item.IdJuez.toString()}
      />
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
  button: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
  item: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Index;