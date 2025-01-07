import React from 'react';
import { View, Text } from 'react-native';
import Pdf from 'react-native-pdf';

const MostrarPDFNuevaPagina = () => {
  const source = { uri: 'https://example.com/ejemplo.pdf', cache: true }; // URL del PDF

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Número de páginas: ${numberOfPages}`);
          console.log(`Ruta del archivo: ${filePath}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Página actual: ${page}`);
          console.log(`Número de páginas: ${numberOfPages}`);
        }}
        onError={(error) => {
          console.log('Error al cargar el PDF:', error);
        }}
        style={{ width: '100%', height: '100%' }}
      />
    </View>
  );
};

export default MostrarPDFNuevaPagina;