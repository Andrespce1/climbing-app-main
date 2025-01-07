// VistaPDFListaResultados.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import axios from 'axios'; // Para las solicitudes AJAX

const VistaPDFListaResultados = () => {
  const [listadoPuntajeBloqueF, setListadoPuntajeBloqueF] = useState([]); // Listado de puntajes finales
  const [listadoPuntajeBloque, setListadoPuntajeBloque] = useState([]); // Listado de puntajes
  const [competencia, setCompetencia] = useState({}); // Información de la competencia
  const [aux, setAux] = useState(1); // Contador para el puesto

  useEffect(() => {
    // Cargar listado de puntajes, información de la competencia desde la API
    axios.get('https://tu-api.com/listado-puntaje-bloque-y-competencia')
      .then(response => {
        setListadoPuntajeBloqueF(response.data.listadoPuntajeBloqueF);
        setListadoPuntajeBloque(response.data.listadoPuntajeBloque);
        setCompetencia(response.data.competencia);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: 'https://www.fedenador.org.ec/wp-content/uploads/2021/05/IMBABURA.png' }} style={styles.logo} />
        <Text style={styles.title}>{competencia.NombreCom}</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Fecha de inicio:</Text>
          <Text style={styles.infoValue}>{competencia.FechaInicioCom}</Text>
          <Text style={styles.infoLabel}>Fecha de fin:</Text>
          <Text style={styles.infoValue}>{competencia.FechaFinCom}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Género:</Text>
          <Text style={styles.infoValue}>{competencia.Genero}</Text>
          <Text style={styles.infoLabel}>Nombre del juez:</Text>
          <Text style={styles.infoValue}>{competencia.NombreDelJuez}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Categoría:</Text>
          <Text style={styles.infoValue}>{competencia.NombreCategoria}</Text>
          <Text style={styles.infoLabel}>Modalidad:</Text>
          <Text style={styles.infoValue}>{competencia.DescripcionModalidad}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Sede:</Text>
          <Text style={styles.infoValue}>{competencia.NombreDeSede}</Text>
        </View>
      </View>

      <View style={styles.resultadosContainer}>
        <Text style={styles.resultadosTitle}>Resultados Finales</Text>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>Puesto</Text>
            <Text style={styles.tableHeaderCell}>Deportista</Text>
            <Text style={styles.tableHeaderCell}>Tops Realizados</Text>
            <Text style={styles.tableHeaderCell}>Intentos Top</Text>
            <Text style={styles.tableHeaderCell}>Zonas Realizadas</Text>
            <Text style={styles.tableHeaderCell}>Intentos Zona</Text>
          </View>
          {listadoPuntajeBloqueF.map((registro, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={(index === 0) ? styles.firstPlace : styles.tableCell}>
                {(index === 0) ? (
                  <Image source={{ uri: 'https://example.com/medalla-oro.png' }} style={styles.medal} />
                ) : (
                  <Text>{index + 1}</Text>
                )}
              </Text>
              <Text style={styles.tableCell}>{registro.NombreDep}</Text>
              <Text style={styles.tableCell}>{registro.TopsRealizados}</Text>
              <Text style={styles.tableCell}>{registro.IntentosTops}</Text>
              <Text style={styles.tableCell}>{registro.ZonasRealizadas}</Text>
              <Text style={styles.tableCell}>{registro.IntentosZonas}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.resultadosContainer}>
        <Text style={styles.resultadosTitle}>Resultados Clasificatorias</Text>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>Puesto</Text>
            <Text style={styles.tableHeaderCell}>Deportista</Text>
            <Text style={styles.tableHeaderCell}>Tops Realizados</Text>
            <Text style={styles.tableHeaderCell}>Intentos Top</Text>
            <Text style={styles.tableHeaderCell}>Zonas Realizadas</Text>
            <Text style={styles.tableHeaderCell}>Intentos Zona</Text>
            <Text style={styles.tableHeaderCell}>Clasificado</Text>
          </View>
          {listadoPuntajeBloque.map((registro, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{index + 1}</Text>
              <Text style={styles.tableCell}>{registro.NombreDep}</Text>
              <Text style={styles.tableCell}>{registro.TopsRealizados}</Text>
              <Text style={styles.tableCell}>{registro.IntentosTops}</Text>
              <Text style={styles.tableCell}>{registro.ZonasRealizadas}</Text>
              <Text style={styles.tableCell}>{registro.IntentosZonas}</Text>
              <Text style={styles.tableCell}>z
                {(index < 6) ? (
                  <Text style={styles.clasificadoSi}>Sí</Text>
                ) : (
                  <Text style={styles.clasificadoNo}>No</Text>
                )}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.firmasContainer}>
        <Text style={styles.firmasTitle}>Firmas</Text>
        <View style={styles.firmasTableContainer}>
          <View style={styles.firmasTableRow}>
            <View style={styles.firmaContainer}>
              <View style={styles.firmaEspacio} />
              <Text style={styles.firmaTexto}>Firma del Juez</Text>
            </View>
            <View style={styles.firmaContainer}>
              <View style={styles.firmaEspacio} />
              <Text style={styles.firmaTexto}>Firma del Entrenador</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 16,
  },
  resultadosContainer: {
    padding: 20,
  },
  resultadosTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  tableHeaderCell: {
    width: '16.67%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    width: '16.67%',
    fontSize: 16,
  },
  firstPlace: {
    width: '16.67%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  medal: {
    width: 30,
    height: 30,
  },
  clasificadoSi: {
    color: 'green',
  },
  clasificadoNo: {
    color: 'red',
  },
  firmasContainer: {
    padding: 20,
  },
  firmasTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  firmasTableContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  firmasTableRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  firmaContainer: {
    alignItems: 'center',
  },
  firmaEspacio: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 20,
  },
  firmaTexto: {
    fontSize: 16,
  },
});

export default VistaPDFListaResultados;

//Notas Importantes
//API y Backend: Ajusta las URLs de la API para que coincidan con tu backend.
//Estilos: Personaliza los estilos según el diseño de tu aplicación.
//Componentes y Librerías: Asegúrate de tener instalada la librería react-native.
//Estado y Efectos: Ajusta la lógica de estado y efectos según sea necesario para tu aplicación.
//Seguridad y Validación: Implementa las medidas de seguridad y validación adecuadas para los datos del usuario y las interacciones con tu API.