import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Index = ({ navigation, route }) => {
  const { detalleCompetencias } = route.params;

  const handleCrear = () => {
    // Navegar a la pantalla de creación
    navigation.navigate('CrearDetalleCompetencia');
  };

  const handleEditar = (idDetalle) => {
    // Navegar a la pantalla de edición
    navigation.navigate('EditarDetalleCompetencia', { idDetalle });
  };

  const handleDetalles = (idDetalle) => {
    // Navegar a la pantalla de detalles
    navigation.navigate('DetallesDetalleCompetencia', { idDetalle });
  };

  const handleEliminar = (idDetalle) => {
    // Implementar lógica para eliminar el detalle de competencia
    console.log('Eliminar detalle de competencia:', idDetalle);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DETALLE DE COMPETENCIAS</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.createButton} onPress={handleCrear}>
          <Text style={styles.createButtonText}>Crear</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={detalleCompetencias}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.column}>Puesto: {item.Puesto}</Text>
            <Text style={styles.column}>Clasificación: {item.ClasRes}</Text>
            <Text style={styles.column}>Octavos: {item.OctavosRes}</Text>
            <Text style={styles.column}>Cuartos: {item.CuartosRes}</Text>
            <Text style={styles.column}>SemiFinal: {item.SemiRes}</Text>
            <Text style={styles.column}>Final: {item.FinalRes}</Text>
            <Text style={styles.column}>Competencia: {item.IdComNavigation.NombreCom}</Text>
            <Text style={styles.column}>
              Deportista: {item.IdDepNavigation.NombresDep} {item.IdDepNavigation.ApellidosDep}
            </Text>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEditar(item.IdDetalle)}>
                <Text style={styles.editButtonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.detailsButton} onPress={() => handleDetalles(item.IdDetalle)}>
                <Text style={styles.detailsButtonText}>Detalles</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleEliminar(item.IdDetalle)}>
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.IdDetalle.toString()}
      />
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
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignSelf: 'flex-start',
  },
  createButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  row: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
  },
  column: {
    fontSize: 16,
    marginBottom: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#ffc107',
    padding: 10,
    borderRadius: 5,
    width: '30%',
  },
  editButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  detailsButton: {
    backgroundColor: '#17a2b8',
    padding: 10,
    borderRadius: 5,
    width: '30%',
  },
  detailsButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    width: '30%',
  },
  deleteButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Index;