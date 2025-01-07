import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Details = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { detalleCompetencia } = route.params;

  const handleEditar = () => {
    // Navegar a la pantalla de edición
    navigation.navigate('EditarDetalleCompetencia', { idDetalle: detalleCompetencia.IdDetalle });
  };

  const handleRegresar = () => {
    // Navegar a la pantalla de lista de competencias
    navigation.navigate('Competencia');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DETALLES</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>Detalle de la Competencia</Text>
        <View style={styles.detailSeparator} />
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Puesto</Text>
          <Text style={styles.detailValue}>{detalleCompetencia.Puesto}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Resultado de Clasificación</Text>
          <Text style={styles.detailValue}>{detalleCompetencia.ClasRes}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Resultado de la Final</Text>
          <Text style={styles.detailValue}>{detalleCompetencia.FinalRes}</Text>
        </View>
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
        <TouchableOpacity style={styles.editButton} onPress={handleEditar}>
          <Text style={styles.editButtonText}>Editar</Text>
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
  editButton: {
    backgroundColor: '#ffc107',
    padding: 10,
    borderRadius: 5,
    width: '45%',
  },
  editButtonText: {
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

export default Details;