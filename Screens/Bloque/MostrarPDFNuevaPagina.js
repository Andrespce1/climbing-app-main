// MostrarPDFNuevaPagina.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';

const MostrarPDFNuevaPagina = ({ route }) => {
  const { pdfUri } = route.params; // Asumiendo que pasas la URI del PDF como parámetro

  return (
    <View style={styles.container}>
      <Pdf
        source={{ uri: pdfUri }}
        onLoadComplete={(numberOfPages, filePath, { size }) => {
          console.log(`Número de páginas: ${numberOfPages}`);
          console.log(`Ruta del archivo: ${filePath}`);
          console.log(`Tamaño del archivo: ${size}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Página actual: ${page}`);
          console.log(`Número de páginas: ${numberOfPages}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link presionado: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: '100%',
  },
});

export default MostrarPDFNuevaPagina;