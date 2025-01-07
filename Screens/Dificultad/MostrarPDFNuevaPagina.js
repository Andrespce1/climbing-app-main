import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MostrarPDFNuevaPagina = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mostrar PDF Nueva Página</Text>
      {/* Aquí puedes agregar elementos visuales para mostrar el PDF o cualquier otro contenido */}
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
  title: {
    fontSize: 24, // Tamaño de la fuente del título
    fontWeight: 'bold', // Peso de la fuente del título
    color: '#333', // Color del título
    marginBottom: 10, // Espacio entre el título y el contenido siguiente
  },
});

export default MostrarPDFNuevaPagina;