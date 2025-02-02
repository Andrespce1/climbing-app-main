import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Importa useNavigation y useRoute
import api from '../../services/api'; // Asegúrate de importar tu API

const EditSede = () => {
  const navigation = useNavigation(); // Inicializa la navegación
  const route = useRoute(); // Obtiene los parámetros de la ruta
  const sede = route.params.club; // Obtener el objeto club pasado como parámetro

  // Inicializar los estados
  const [nombreSede, setNombreSede] = useState(sede.nombreSede || ''); // Inicializa con el nombre de la sede

  const guardarSede = async () => {
    if (!nombreSede) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }
    try {
      const response = await api.put(`/api/Sede/${sede.idSede}`, { // Asegúrate de usar el ID correcto
        nombreSede,
      });
      console.log('Sede actualizada:', response.data);
      Alert.alert('Éxito', 'Sede actualizada con éxito');
      navigation.navigate('Index'); // Regresar a la lista de sedes
    } catch (error) {
      console.error('Error guardando sede:', error);
      Alert.alert('Error', 'No se pudo actualizar la sede');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>EDITAR SEDE</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nombre de la Sede:</Text>
        <TextInput
          style={styles.input}
          value={nombreSede}
          onChangeText={setNombreSede}
          placeholder="Ingrese el nombre de la sede"
        />

        {/* Botones para guardar y regresar */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={guardarSede} style={[styles.button, styles.saveButton]}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.button, styles.cancelButton]}>
            <Text style={styles.buttonText}>Regresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
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
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    elevation: 2,
    width: '45%',
  },
  saveButton: {
    backgroundColor: '#007bff',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  }
});

export default EditSede;