// TablaResultadoFinales.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import axios from 'axios'; // Para las solicitudes AJAX

const TablaResultadoFinales = () => {
  const [listadoPuntajeBloque, setListadoPuntajeBloque] = useState([]); // Listado de puntajes
  const [listadoDeportistaCompetencia, setListadoDeportistaCompetencia] = useState([]); // Listado de deportistas
  const [idCompetencia, setIdCompetencia] = useState(''); // ID de la competencia

  useEffect(() => {
    // Cargar listado de puntajes, listado de deportistas y ID de competencia desde la API
    axios.get('https://tu-api.com/listado-puntaje-bloque-y-deportistas')
      .then(response => {
        setListadoPuntajeBloque(response.data.listadoPuntajeBloque);
        setListadoDeportistaCompetencia(response.data.listadoDeportistaCompetencia);
        setIdCompetencia(response.data.idCompetencia);
      })
      .catch(error => console.error(error));
  }, []);

  const handleAgregarResultadosFinales = () => {
    // Lógica para agregar resultados finales, puede incluir una llamada a la API
    Alert.alert('Agregar Resultados Finales', 'Se están agregando los resultados finales...');
  };

  const handleTablaPosicionesFinales = () => {
    // Lógica para navegar a la tabla de posiciones finales
    Alert.alert('Tabla Posiciones Finales', 'Se está navegando a la tabla de posiciones finales...');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.etiquetaContainer}>
        <Text style={styles.etiqueta}>Fase Final</Text>
      </View>

      <View style={styles.btnGroupContainer}>
        <TouchableOpacity style={styles.btn} onPress={handleAgregarResultadosFinales}>
          <Text style={styles.btnText}>Agregar Resultados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.activeBtn]}>
          <Text style={styles.btnText}>Tabla Resultado</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleTablaPosicionesFinales}>
          <Text style={styles.btnText}>Tabla Posiciones</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Tabla de Puntajes</Text>

      {listadoPuntajeBloque.length > 0 ? (
        <Table borderStyle={{ borderWidth: 1, borderColor: '#ddd' }}>
          <Row data={['Deportista', 'Número de Bloque', 'Intentos Top', 'Intentos Zona']} style={styles.header} textStyle={styles.headerText} />
          {listadoPuntajeBloque.map((puntaje, index) => {
            const deportista = listadoDeportistaCompetencia.find(d => d.IdDep === puntaje.IdDep);
            if (deportista && puntaje.IdDep !== listadoPuntajeBloque[index - 1]?.IdDep) {
              return (
                <Row key={index} data={[
                  `${deportista.NombresDep} ${deportista.ApellidosDep}`,
                  puntaje.NumeroBloque,
                  puntaje.IntentosTops,
                  puntaje.IntentosZonas,
                ]} style={styles.row} textStyle={styles.rowText} />
              );
            } else if (!deportista) {
              return (
                <Row key={index} data={[
                  'Deportista no encontrado',
                  puntaje.NumeroBloque,
                  puntaje.IntentosTops,
                  puntaje.IntentosZonas,
                ]} style={styles.row} textStyle={styles.rowText} />
              );
            } else {
              return (
                <Row key={index} data={[
                  puntaje.NumeroBloque,
                  puntaje.IntentosTops,
                  puntaje.IntentosZonas,
                ]} style={styles.row} textStyle={styles.rowText} />
              );
            }
          })}
        </Table>
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No se encontraron puntajes</Text>
        </View>
      )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
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
  noDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  noDataText: {
    fontSize: 18,
    color: '#666',
  },
});

export default TablaResultadoFinales;

//Notas Importantes
//API y Backend: Ajusta las URLs de la API para que coincidan con tu backend.
//Estilos: Personaliza los estilos según el diseño de tu aplicación.
//Componentes y Librerías: Asegúrate de tener instalada la librería react-native-table-component.
//Estado y Efectos: Ajusta la lógica de estado y efectos según sea necesario para tu aplicación.
//Seguridad y Validación: Implementa las medidas de seguridad y validación adecuadas para los datos del usuario y las interacciones con tu API.