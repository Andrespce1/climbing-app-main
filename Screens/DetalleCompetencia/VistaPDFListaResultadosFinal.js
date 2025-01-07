import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Pdf from 'react-native-pdf';

const VistaPDFListaResultadosFinal = () => {
  const competencium = {
    NombreCom: 'Nombre de la Competencia',
    FechaInicioCom: 'Fecha de Inicio',
    FechaFinCom: 'Fecha de Fin',
    Genero: 'Género',
    NombreDelJuez: 'Nombre del Juez',
    NombreCategoria: 'Nombre de la Categoría',
    DescripcionModalidad: 'Descripción de la Modalidad',
    NombreDeSede: 'Nombre de la Sede',
  };

  const detalleCompetencium = [
    {
      Puesto: '1',
      Deportista: 'Deportista 1',
      ResultadoClasificacion: 'Resultado de Clasificación 1',
      ResultadoOctavos: 'Resultado de Octavos 1',
      ResultadoCuartos: 'Resultado de Cuartos 1',
      ResultadoSemifinal: 'Resultado de Semifinal 1',
      ResultadoFinal: 'Resultado de Final 1',
    },
    {
      Puesto: '2',
      Deportista: 'Deportista 2',
      ResultadoClasificacion: 'Resultado de Clasificación 2',
      ResultadoOctavos: null,
      ResultadoCuartos: null,
      ResultadoSemifinal: null,
      ResultadoFinal: null,
    },
    // Agrega más registros según sea necesario
  ];

  const [cont, setCont] = useState(1);

  useEffect(() => {
    setCont(1);
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://www.fedenador.org.ec/wp-content/uploads/2021/05/IMBABURA.png' }}
            style={styles.logo}
          />
          <Text style={styles.title}>{competencium.NombreCom}</Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Fecha de inicio:</Text>
            <Text style={styles.infoValue}>{competencium.FechaInicioCom}</Text>
            <Text style={styles.infoLabel}>Fecha de fin:</Text>
            <Text style={styles.infoValue}>{competencium.FechaFinCom}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Género:</Text>
            <Text style={styles.infoValue}>{competencium.Genero}</Text>
            <Text style={styles.infoLabel}>Nombre del juez:</Text>
            <Text style={styles.infoValue}>{competencium.NombreDelJuez}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Categoría:</Text>
            <Text style={styles.infoValue}>{competencium.NombreCategoria}</Text>
            <Text style={styles.infoLabel}>Modalidad:</Text>
            <Text style={styles.infoValue}>{competencium.DescripcionModalidad}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Sede:</Text>
            <Text style={styles.infoValue}>{competencium.NombreDeSede}</Text>
          </View>
        </View>

        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>RESULTADOS</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderLabel}>Puesto</Text>
            <Text style={styles.tableHeaderLabel}>Puesto de Clasificación</Text>
            <Text style={styles.tableHeaderLabel}>Deportista</Text>
            <Text style={styles.tableHeaderLabel}>Clasificación</Text>
            <Text style={styles.tableHeaderLabel}>Octavos</Text>
            <Text style={styles.tableHeaderLabel}>Cuartos</Text>
            <Text style={styles.tableHeaderLabel}>Semifinal</Text>
            <Text style={styles.tableHeaderLabel}>Final</Text>
          </View>
          {detalleCompetencium.map((registro, index) => (
            <View key={index} style={[styles.tableRow, cont === 1 ? styles.firstRow : null]}>
              <Text style={styles.tableCell}>
                {cont === 1 ? (
                  <Image
                    source={require('./medalla-oro.png')} // Reemplaza con la imagen de la medalla de oro
                    style={styles.medal}
                  />
                ) : (
                  cont
                )}
              </Text>
              <Text style={styles.tableCell}>{registro.Puesto || 'No clasifica'}</Text>
              <Text style={styles.tableCell}>{registro.Deportista}</Text>
              <Text style={styles.tableCell}>{registro.ResultadoClasificacion}</Text>
              <Text style={styles.tableCell}>{registro.ResultadoOctavos || 'No registra'}</Text>
              <Text style={styles.tableCell}>{registro.ResultadoCuartos || 'No registra'}</Text>
              <Text style={styles.tableCell}>{registro.ResultadoSemifinal || 'No registra'}</Text>
              <Text style={styles.tableCell}>{registro.ResultadoFinal || 'No registra'}</Text>
              {setCont(cont + 1)}
            </View>
          ))}
        </View>

        <View style={styles.firmasContainer}>
          <Text style={styles.firmasTitle}>Firmas</Text>
          <View style={styles.firmasRow}>
            <View style={styles.firmaContainer}>
              <View style={styles.firma} />
              <Text style={styles.firmaLabel}>Firma del Juez</Text>
            </View>
            <View style={styles.firmaContainer}>
              <View style={styles.firma} />
              <Text style={styles.firmaLabel}>Firma del Entrenador</Text>
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
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    height: 50,
    width: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '30%',
  },
  infoValue: {
    fontSize: 16,
    width: '60%',
  },
  tableContainer: {
    marginBottom: 20,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tableHeaderLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '12.5%',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  firstRow: {
    backgroundColor: '#ffffcc',
  },
  tableCell: {
    fontSize: 16,
    width: '12.5%',
  },
  medal: {
    height: 20,
    width: 20,
  },
  firmasContainer: {
    marginBottom: 20,
  },
  firmasTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  firmasRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  firmaContainer: {
    width: '45%',
    alignItems: 'center',
  },
  firma: {
    height: 50,
    width: 100,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
  },
  firmaLabel: {
    fontSize: 16,
  },
});

export default VistaPDFListaResultadosFinal;