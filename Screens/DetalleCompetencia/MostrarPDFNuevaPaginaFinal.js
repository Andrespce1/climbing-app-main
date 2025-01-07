import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';
import { useNavigation } from '@react-navigation/native';

const MostrarPDFNuevaPaginaFinal = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = React.useState(true);
  const source = { uri: 'https://example.com/ejemplo.pdf', cache: true }; // URL del PDF

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Pdf
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Número de páginas: ${numberOfPages}`);
            console.log(`Ruta del archivo: ${filePath}`);
            setIsLoading(false);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Página actual: ${page}`);
            console.log(`Número de páginas: ${numberOfPages}`);
          }}
          onError={(error) => {
            console.log('Error al cargar el PDF:', error);
            setIsLoading(false);
          }}
          style={styles.pdf}
        />
      )}
      <View style={styles.buttonContainer}>
        <Text style={styles.button} onPress={handleBackPress}>
          Volver
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  pdf: {
    width: '100%',
    height: '90%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  button: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
});

export default MostrarPDFNuevaPaginaFinal;