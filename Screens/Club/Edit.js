import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Importa useNavigation y useRoute
import api from '../../services/api'; // Asegúrate de importar tu API

const EditClub = () => {
  const navigation = useNavigation(); // Inicializa la navegación
  const route = useRoute(); // Obtiene los parámetros de la ruta
  const club = route.params.club; // Obtener el objeto club pasado como parámetro

  // Inicializar los estados
  const [nombreClub, setNombreClub] = useState(club.nombreClub || ''); // Inicializa con el nombre del club

  const guardarClub = async () => {
    if (!nombreClub) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    try {
      const response = await api.put(`/api/Club/${club.idClub}`, { // Asegúrate de usar el ID correcto
        nombreClub,
      });
      console.log('Club actualizado:', response.data);
      Alert.alert('Éxito', 'Club actualizado con éxito');
      navigation.navigate('Index'); // Regresar a la lista de clubes
    } catch (error) {
      console.error('Error guardando club:', error);
      Alert.alert('Error', 'No se pudo actualizar el club');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>EDITAR CLUB</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nombre del Club:</Text>
        <TextInput
          style={styles.input}
          value={nombreClub}
          onChangeText={setNombreClub}
          placeholder="Ingrese el nombre del club"
        />
        
        {/* Botones para guardar y regresar */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={guardarClub} style={[styles.button, styles.saveButton]}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={[styles.button, styles.cancelButton]}>
            <Text style={styles.buttonText}>Regresar</Text>
          </TouchableOpacity>
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
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop :10 ,
   },
   button:{
       paddingVertical :10 ,
       paddingHorizontal :15 ,
       borderRadius :5 ,
       elevation :2 ,
       width:'45%',
   },
   saveButton:{
       backgroundColor:'#007bff' ,
   },
   cancelButton:{
       backgroundColor:'#dc3545' ,
   },
   buttonText:{
       color:'#fff' ,
       textAlign:'center' , 
       fontWeight:'bold' ,
   }
});

export default EditClub;
