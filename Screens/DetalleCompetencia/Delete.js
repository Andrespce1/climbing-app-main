import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Delete = ({ navigation, route }) => {
  const { detalleCompetencia } = route.params;

  const handleEliminar = () => {
    // Implementar lógica para eliminar el detalle de competencia
    console.log('Eliminar detalle de competencia:', detalleCompetencia);
    navigation.goBack();
  };

  const handleRegresar = () => {
    // Navegar a la pantalla de competencias
    navigation.navigate('Competencia');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ELIMINAR</Text>
      <Text style={styles.subtitle}>¿Estás seguro de eliminar este Detalle?</Text>
      <View style={styles.separator} />

      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>DetalleCompetencium</Text>
        <View style={styles.detailSeparator} />
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Competencia</Text>
          <Text style={styles.detailValue}>{detalleCompetencia.IdComNavigation.NombreCom}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Deportista</Text>
          <Text style={styles.detailValue}>
            {detalleCompetencia.IdDepNavigation.NombresDep} {detalleCompetencia.IdDepNavigation.ApellidosDep}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleEliminar}>
          <Text style={styles.deleteButtonText}>Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.goBackButton} onPress={handleRegresar}>
          <Text style={styles.goBackButtonText}>Regresar</Text>
        </TouchableOpacity>
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
  detailContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  detailTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  detailSeparator: {
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailValue: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: '#6c757d',
    padding: 10,
    borderRadius: 5,
    width: '45%',
  },
  deleteButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  goBackButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    width: '45%',
  },
  goBackButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Delete;