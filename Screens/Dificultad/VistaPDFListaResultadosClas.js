import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Table from 'react-native-table-component';

const VistaPDFListaResultadosClas = () => {
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
      Puesto: 1,
      Deportista: 'Deportista 1',
      Clasificacion1: 'Clasificación 1',
      Clasificacion2: 'Clasificación 2',
    },
    {
      Puesto: 2,
      Deportista: 'Deportista 2',
      Clasificacion1: 'Clasificación 1',
      Clasificacion2: 'Clasificación 2',
    },
  ];

  const tableHead = [
    'Puesto de Clasificación',
    'Deportista',
    'Clasificación 1',
    'Clasificación 2',
  ];

  const tableData = detalleCompetencium.map((registro) => [
    registro.Puesto,
    registro.Deportista,
    registro.Clasificacion1,
    registro.Clasificacion2,
  ]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://www.fedenador.org.ec/wp-content/uploads/2021/05/IMBABURA.png' }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>{competencium.NombreCom}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Table borderStyle={{ borderColor: '#ddd' }}>
          <Row
            data={[
              'Fecha de inicio:',
              competencium.FechaInicioCom,
              'Fecha de fin:',
              competencium.FechaFinCom,
            ]}
            style={styles.tableRow}
            textStyle={styles.tableText}
          />
          <Row
            data={[
              'Género:',
              competencium.Genero,
              'Nombre del juez:',
              competencium.NombreDelJuez,
            ]}
            style={styles.tableRow}
            textStyle={styles.tableText}
          />
          <Row
            data={[
              'Categoría:',
              competencium.NombreCategoria,
              'Modalidad:',
              competencium.DescripcionModalidad,
            ]}
            style={styles.tableRow}
            textStyle={styles.tableText}
          />
          <Row
            data={['Sede:', competencium.NombreDeSede, '', '']}
            style={styles.tableRow}
            textStyle={styles.tableText}
          />
        </Table>
      </View>

      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>Deportistas Clasificados</Text>
        <Table borderStyle={{ borderColor: '#ddd' }}>
          <Row data={tableHead} style={styles.tableHeader} textStyle={styles.tableHeaderText} />
          {tableData.map((rowData, index) => (
            <Row
              key={index}
              data={rowData}
              style={[
                styles.tableRow,
                index < 8 && { backgroundColor: '#f9f9f9', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 },
              ]}
              textStyle={styles.tableText}
            />
          ))}
        </Table>
      </View>

      <View style={styles.signaturesContainer}>
        <Text style={styles.signaturesTitle}>Firmas</Text>
        <View style={styles.signatureRow}>
          <View style={styles.signatureBox}>
            <Text>Firma del Juez</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text>Firma del Entrenador</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 30,
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
    textTransform: 'uppercase',
  },
  infoContainer: {
    marginBottom: 20,
  },
  tableRow: {
    height: 40,
    backgroundColor: '#fff',
  },
  tableText: {
    margin: 6,
    fontSize: 16,
  },
  tableHeader: {
    height: 40,
    backgroundColor: '#ddd',
  },
  tableHeaderText: {
    margin: 6,
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsContainer: {
    marginBottom: 20,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  signaturesContainer: {
    marginBottom: 20,
  },
  signaturesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  signatureRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  signatureBox: {
    height: 100,
    width: 150,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VistaPDFListaResultadosClas;