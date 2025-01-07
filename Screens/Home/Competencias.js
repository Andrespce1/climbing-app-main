import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

const Competencias=() =>{
  return (
    <View >
        <Text style={styles.title}>Soy la página de COMPETENCIAS</Text>        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  alert: {
    backgroundColor: '#dff0d8',
    borderColor: '#d6e9c6',
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3e8e41',
  },
});

export default Competencias;


