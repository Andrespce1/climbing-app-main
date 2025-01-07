import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const Index = ({ navigation }) => {
  const [sedes, setSedes] = useState([]);

  useEffect(() => {
    // Lógica para obtener la lista de sedes desde la API o base de datos
    const sedesDummy = [
      { IdSede: 1, NombreSede: 'Sede 1' },
      { IdSede: 2, NombreSede: 'Sede 2' },
    ];
    setSedes(sedesDummy);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.label}>Nombre de Sede:</Text>
      <Text style={styles.value}>{item.NombreSede}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('SedeEditar', { idSede: item.IdSede })}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => navigation.navigate('SedeDetalles', { idSede: item.IdSede })}
        >
          <Text style={styles.buttonText}>Detalles</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => navigation.navigate('SedeEliminar', { idSede: item.IdSede })}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Sedes</Text>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('SedeCreate')}
      >
        <Text style={styles.buttonText}>Crear</Text>
      </TouchableOpacity>
      <FlatList
        data={sedes}
        renderItem={renderItem}
        keyExtractor={(item) => item.IdSede.toString()}
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
  createButton: {
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
  editButton: {
    width: '30%',
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#ffc107',
  },
  detailsButton: {
    width: '30%',
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#17a2b8',
  },
  deleteButton: {
    width: '30%',
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#dc3545',
  },
});

export default Index;