// TablaPosicionesClasificatoria.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import axios from 'axios'; // Para las solicitudes AJAX

const TablaPosicionesClasificatoria = () => {
  const [listadoPuntajeBloque, setListadoPuntajeBloque] = useState([]); // Listado de puntajes
  const [idCompetencia, setIdCompetencia] = useState(''); // ID de la competencia
  const [aux, setAux] = useState(1); // Contador para el puesto

  useEffect(() => {
    // Cargar listado de puntajes y ID de competencia desde la API
    axios.get('https://tu-api.com/listado-puntaje-bloque')
      .then(response => {
        setListadoPuntajeBloque(response.data.listadoPuntajeBloque);
        setIdCompetencia(response.data.idCompetencia);
      })
      .catch(error => console.error(error));
  }, []);

  const handleFinalizarClasificatorias = () => {
    // Lógica para finalizar clasificatorias, puede incluir una llamada a la API
    Alert.alert('Clasificatorias Finalizadas', 'Se han finalizado las clasificatorias.');
  };

  const handleMostrarReporte = () => {
    // Lógica para mostrar el reporte, puede incluir una llamada a la API para generar el PDF
    // y luego abrirlo en una nueva pantalla o descargarlo
    Alert.alert('Reporte', 'Se está generando el reporte...');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.etiquetaContainer}>
        <Text style={styles.etiqueta}>Fase Clasificatoria</Text>
      </View>

      <View style={styles.btnGroupContainer}>
        <TouchableOpacity style={styles.btn} onPress={() => console.log('Agregar Resultados')}>
          <Text style={styles.btnText}>Agregar Resultados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => console.log('Tabla Resultados')}>
          <Text style={styles.btnText}>Tabla Resultados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.activeBtn]}>
          <Text style={styles.btnText}>Tabla Posiciones</Text>
        </TouchableOpacity>
      </View>

      <Table borderStyle={{ borderWidth: 1, borderColor: '#ddd' }}>
        <Row data={['Puesto', 'Deportista', 'Tops Realizados', 'Intentos Top', 'Zonas Realizadas', 'Intentos Zona', 'Clasificado']} style={styles.header} textStyle={styles.headerText} />
        {listadoPuntajeBloque.map((registro, index) => (
          <Row key={index} data={[
            aux + index,
            registro.NombreDep,
            registro.TopsRealizados,
            registro.IntentosTops,
            registro.ZonasRealizadas,
            registro.IntentosZonas,
            (aux + index < 7) ? 'Sí' : 'No',
          ]} style={styles.row} textStyle={styles.rowText} />
        ))}
      </Table>

      <TouchableOpacity style={styles.finalizarBtn} onPress={handleFinalizarClasificatorias}>
        <Text style={styles.finalizarBtnText}>Finalizar Clasificatorias</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.reporteBtn} onPress={handleMostrarReporte}>
        <Text style={styles.reporteBtnText}>Reporte</Text>
      </TouchableOpacity>
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
    backgroundColor: '#007bff',
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
  header: {
    // Estilos
  },
  headerText: {
    // Estilos
  },
  row: {
    // Estilos
  },
  rowText: {
    // Estilos
  },
  finalizarBtn: {
    // Estilos
  },
  finalizarBtnText: {
    // Estilos
  },
  reporteBtn: {
    // Estilos
  },
  reporteBtnText: {
    // Estilos
  },
});

export default TablaPosicionesClasificatoria;

//Notas Importantes
//API y Backend: Ajusta las URLs de la API para que coincidan con tu backend.
//Estilos: Personaliza los estilos según el diseño de tu aplicación.
//Componentes y Librerías: Asegúrate de tener instalada la librería react-native-table-component.
//Estado y Efectos: Ajusta la lógica de estado y efectos según sea necesario para tu aplicación.
//Seguridad y Validación: Implementa las medidas de seguridad y validación adecuadas para los datos del usuario y las interacciones con tu API.