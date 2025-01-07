// Index.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Para el selector de deportista
import axios from 'axios'; // Para las solicitudes AJAX

const Index = () => {
  const [errorMessage, setErrorMessage] = useState(''); // Mensaje de error
  const [idCompetencia, setIdCompetencia] = useState(''); // ID de la competencia
  const [deportistas, setDeportistas] = useState([]); // Lista de deportistas
  const [selectedDeportista, setSelectedDeportista] = useState(''); // Deportista seleccionado
  const [listadoDeportistaCompetencia, setListadoDeportistaCompetencia] = useState([]); // Listado de deportistas por competencia

  useEffect(() => {
    // Cargar ID de competencia, lista de deportistas y listado de deportistas por competencia desde la API
    axios.get('https://tu-api.com/competencia-y-deportistas')
      .then(response => {
        setIdCompetencia(response.data.idCompetencia);
        setDeportistas(response.data.deportistas);
        setListadoDeportistaCompetencia(response.data.listadoDeportistaCompetencia);
      })
      .catch(error => {
        setErrorMessage('Error al cargar datos');
        console.error(error);
      });
  }, []);

  const handleDeportistaChange = (itemValue) => {
    setSelectedDeportista(itemValue);
  };

  const handleSubmit = () => {
    // Lógica para enviar los datos del formulario a la API
    const datos = {
      IdCom: idCompetencia,
      IdDep: selectedDeportista,
    };
    axios.post('https://tu-api.com/agregar-depo', datos)
      .then(response => {
        if (response.data.success) {
          Alert.alert('Éxito', 'Depo agregado con éxito');
        } else {
          setErrorMessage(response.data.message);
        }
      })
      .catch(error => {
        setErrorMessage('Error al agregar depo');
        console.error(error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      {errorMessage && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}

      
        <View style={styles.formGroup}>
          <Text style={styles.label}>Seleccionar deportista:</Text>
          <Picker
            selectedValue={selectedDeportista}
            style={styles.picker}
            onValueChange={handleDeportistaChange}
          >
            <Picker.Item label="Seleccione un deportista" value="" />
            {deportistas.map(deportista => (
              <Picker.Item key={deportista.id} label={deportista.nombre} value={deportista.id} />
            ))}
          </Picker>
        </View>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>Enviar</Text>
        </TouchableOpacity>
      

      <TouchableOpacity style={styles.warningBtn} onPress={() => console.log('Agregar Resultados')}>
        <Text style={styles.warningBtnText}>Agregar Resultados</Text>
      </TouchableOpacity>

      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>Listado de Deportistas por Competencia</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>Apellidos</Text>
          <Text style={styles.tableHeaderCell}>Nombres</Text>
        </View>
        {listadoDeportistaCompetencia.map(deportista => (
          <View key={deportista.id} style={styles.tableRow}>
            <Text style={styles.tableCell}>{deportista.apellidos}</Text>
            <Text style={styles.tableCell}>{deportista.nombres}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Estilos para cada componente, ajusta según sea necesario
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorContainer: {
    backgroundColor: '#dc3545',
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: '#fff',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  submitBtn: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 16,
  },
  warningBtn: {
    backgroundColor: '#ffc107',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  warningBtnText: {
    color: '#fff',
    fontSize: 16,
  },
  tableContainer: {
    marginTop: 20,
  },
  tableTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  tableHeaderCell: {
    width: '50%',
    fontSize: 16,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    width: '50%',
    fontSize: 16,
  },
});

export default Index;

//Notas Importantes
//API y Backend: Ajusta las URLs de la API para que coincidan con tu backend.
//Estilos: Personaliza los estilos según el diseño de tu aplicación.
//Componentes y Librerías: Asegúrate de tener instalada la librería @react-native-community/picker.
//Estado y Efectos: Ajusta la lógica de estado y efectos según sea necesario para tu aplicación.
//Seguridad y Validación: Implementa las medidas de seguridad y validación adecuadas para los datos del usuario y las interacciones con tu API.