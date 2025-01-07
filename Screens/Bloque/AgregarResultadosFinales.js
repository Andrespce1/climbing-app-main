// AgregarResultadosFinales.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker'; // Para el selector de deportista
import axios from 'axios'; // Para las solicitudes AJAX

const AgregarResultadosFinales = () => {
  const [idCompetencia, setIdCompetencia] = useState(''); // ID de la competencia
  const [deportistas, setDeportistas] = useState([]); // Lista de deportistas
  const [selectedDeportista, setSelectedDeportista] = useState(''); // Deportista seleccionado
  const [datosDeportista, setDatosDeportista] = useState({}); // Datos del deportista

  useEffect(() => {
    // Cargar ID de competencia y lista de deportistas desde la API
    axios.get('https://tu-api.com/competencia-y-deportistas')
      .then(response => {
        setIdCompetencia(response.data.idCompetencia);
        setDeportistas(response.data.deportistas);
      })
      .catch(error => console.error(error));
  }, []);

  const handleDeportistaChange = (itemValue) => {
    setSelectedDeportista(itemValue);
    // Lógica para obtener datos del deportista seleccionado, si es necesario
  };

  const handleSubmit = () => {
    // Lógica para enviar los datos del formulario a la API
    const datos = {
      IdCom: idCompetencia,
      IdDep: selectedDeportista,
      etapa: 'Final',
      // Agrega los demás campos del formulario según sea necesario
    };
    axios.post('https://tu-api.com/agregar-depo-datos', datos)
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.etiquetaContainer}>
        <Text style={styles.etiqueta}>Fase Final</Text>
      </View>

      <View style={styles.btnGroupContainer}>
        <TouchableOpacity style={[styles.btn, styles.activeBtn]} onPress={() => console.log('Agregar Resultado')}>
          <Text style={styles.btnText}>Agregar Resultado</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => console.log('Tabla Resultados Finales')}>
          <Text style={styles.btnText}>Tabla Resultados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => console.log('Tabla Posiciones Finales')}>
          <Text style={styles.btnText}>Tabla Posiciones</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
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

        <View style={styles.tableContainer}>
          <Text style={styles.category}>Categoría</Text>
          <View style={styles.row}>
            <Text style={styles.cell}>Bloque 1</Text>
            <Text style={styles.cell}>Bloque 2</Text>
            <Text style={styles.cell}>Bloque 3</Text>
            <Text style={styles.cell}>Bloque 4</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.categoryCell}>Top</Text>
            <TextInput style={styles.input} id="Top1" name="Top1" />
            <TextInput style={styles.input} id="Top2" name="Top2" />
            <TextInput style={styles.input} id="Top3" name="Top3" />
            <TextInput style={styles.input} id="Top4" name="Top4" />
          </View>
          <View style={styles.row}>
            <Text style={styles.categoryCell}>Zona</Text>
            <TextInput style={styles.input} id="Zona1" name="Zona1" />
            <TextInput style={styles.input} id="Zona2" name="Zona2" />
            <TextInput style={styles.input} id="Zona3" name="Zona3" />
            <TextInput style={styles.input} id="Zona4" name="Zona4" />
          </View>
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>Guardar</Text>
        </TouchableOpacity>
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
  etiquetaContainer: {
    // Estilos
  },
  etiqueta: {
    backgroundColor: '#dc3545',
    padding: 8,
    borderRadius: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  btnGroupContainer: {
    // Estilos
  },
  btn: {
    // Estilos
  },
  activeBtn: {
    // Estilos
  },
  btnText: {
    // Estilos
  },
  formContainer: {
    // Estilos
  },
  label: {
    // Estilos
  },
  picker: {
    // Estilos
  },
  tableContainer: {
    // Estilos
  },
  category: {
    // Estilos
  },
  row: {
    // Estilos
  },
  cell: {
    // Estilos
  },
  categoryCell: {
    // Estilos
  },
  input: {
    // Estilos
  },
  submitBtn: {
    // Estilos
  },
  submitBtnText: {
    // Estilos
  },
});

export default AgregarResultadosFinales;

//Notas Importantes
//API y Backend: Ajusta las URLs de la API para que coincidan con tu backend.
//Estilos: Personaliza los estilos según el diseño de tu aplicación.
//Componentes y Librerías: Asegúrate de tener instalada la librería @react-native-community/picker.
//Estado y Efectos: Ajusta la lógica de estado y efectos según sea necesario para tu aplicación.
//Seguridad y Validación: Implementa las medidas de seguridad y validación adecuadas para los datos del usuario y las interacciones con tu API.