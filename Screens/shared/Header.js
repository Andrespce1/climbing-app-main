// Header.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>ProyectoFDI.v2</Text>
      <View style={styles.navButtons}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Deportistas')}>
          <Text style={styles.buttonText}>Deportistas</Text>
        </TouchableOpacity>
        {/* Agrega más botones de navegación aquí */}
        <TouchableOpacity onPress={() => navigation.navigate('CerrarSesion')}>
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  navButtons: {
    flexDirection: 'row',
  },
  buttonText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
});

export default Header;