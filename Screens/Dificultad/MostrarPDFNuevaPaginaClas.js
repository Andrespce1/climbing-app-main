import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MostrarPDFNuevaPaginaClas = () => {
  return (
    <View style={styles.container}>
      {/* Aquí puedes agregar elementos visuales para mostrar el PDF o cualquier otro contenido */}
      <Text>Mostrar PDF Nueva Página Clas</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda la pantalla
    justifyContent: 'center', // Alinea verticalmente
    alignItems: 'center', // Alinea horizontalmente
    backgroundColor: '#fff', // Fondo blanco
    paddingHorizontal: 20, // Espacio horizontal entre el contenido y los bordes
    paddingVertical: 30, // Espacio vertical entre el contenido y los bordes
  },
});

export default MostrarPDFNuevaPaginaClas;