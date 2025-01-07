// AgregarResultados.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker'; // Para el selector de deportista
import axios from 'axios'; // Para las solicitudes AJAX

const AgregarResultados = () => {
  const [habilitado, setHabilitado] = useState(true); // Estado para habilitar/deshabilitar
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

    // Obtener datos del deportista seleccionado al cargar
    obtenerDatosDeportista();
  }, []);

  const obtenerDatosDeportista = () => {
    if (selectedDeportista) {
      axios.get(`https://tu-api.com/datos-deportista/${idCompetencia}/${selectedDeportista}`)
        .then(response => {
          setDatosDeportista(response.data);
        })
        .catch(error => console.error(error));
    }
  };

  const handleDeportistaChange = (itemValue) => {
    setSelectedDeportista(itemValue);
    obtenerDatosDeportista();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.etiquetaContainer}>
        <TouchableOpacity style={styles.link} onPress={() => console.log('Ir a Tabla Resultados')}>
          <Text style={styles.linkText}>Fase Clasificatoria</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.btnGroupContainer}>
        <TouchableOpacity style={[styles.btn, styles.activeBtn]}>
          <Text style={styles.btnText}>Agregar Resultado</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => console.log('Ir a Tabla Resultados')}>
          <Text style={styles.btnText}>Tabla Resultados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => console.log('Ir a Tabla Posiciones')}>
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
            {Array.from({ length: 4 }, (_, index) => (
              <TextInput
                key={index}
                style={styles.input}
                value={datosDeportista[`Top${index + 1}`]}
                editable={habilitado}
              />
            ))}
          </View>
          <View style={styles.row}>
            <Text style={styles.categoryCell}>Zona</Text>
            {Array.from({ length: 4 }, (_, index) => (
              <TextInput
                key={index}
                style={styles.input}
                value={datosDeportista[`Zona${index + 1}`]}
                editable={habilitado}
              />
            ))}
          </View>
        </View>

        {habilitado ? (
          <TouchableOpacity style={styles.submitBtn} onPress={() => console.log('Guardar')}>
            <Text style={styles.submitBtnText}>Guardar</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.disabledContainer}>
            <Text style={styles.disabledText}>La fase de clasificación ha finalizado.</Text>
            <Text style={styles.disabledSubtext}>No se admiten nuevos resultados en esta fase.</Text>
          </View>
        )}
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
  link: {
    // Estilos
  },
  linkText: {
    // Estilos
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
  disabledContainer: {
    // Estilos
  },
  disabledText: {
    // Estilos
  },
  disabledSubtext: {
    // Estilos
  },
});

export default AgregarResultados;

//Notas Importantes 
//API y Backend: Este ejemplo asume que tienes una API backend configurada para proporcionar y recibir datos. 
//Debes reemplazar las URLs de ejemplo (https://tu-api.com/...) con las rutas reales de tu API.
  //  Estilos: Los estilos están representados de manera minimalista. Asegúrate de personalizarlos según el diseño de tu aplicación.
   // Componentes y Librerías: Este ejemplo utiliza componentes de React Native y la librería @react-native-community/picker para el selector. 
   //Si no has instalado esta librería, ejecuta npm install @react-native-community/picker o yarn add @react-native-community/picker en tu terminal.
    //Estado y Efectos: El ejemplo utiliza useState para el estado y useEffect para manejar los efectos secundarios (como cargar datos al montar el componente).
    //Ajusta según sea necesario para tu lógica de aplicación.
   // Seguridad y Validación: Asegúrate de//idas de seguridad y validación adecuadas para los datos del usuario y las interacciones con tu API.