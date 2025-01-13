import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const Bienvenida = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }} // Reemplaza esta URL con tu logo o imagen de bienvenida
        style={styles.logo}
      />
      <Text style={styles.title}>¡Bienvenido a Nuestra App!</Text>
      <Text style={styles.subtitle}>
        Explora las funciones de la aplicación y gestiona todo fácilmente.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Clubes')} // Cambia esto al nombre de la pantalla que desees
      >
        <Text style={styles.buttonText}>Comenzar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fc', // Color de fondo claro
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 75, // Hace la imagen redonda
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#4CAF50', // Cambia esto por el color que prefieras
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 5, // Da un efecto de sombra
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Bienvenida;
