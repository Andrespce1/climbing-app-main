import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api'; // Asegúrate de importar tu API

const DetailsClub = () => {
  const navigation = useNavigation(); // Inicializa la navegación
  const route = useRoute(); // Obtiene los parámetros de la ruta
  const club = route.params.club; // Obtener el objeto club pasado como parámetro

  // Inicializar listas
  const [listaDeportistas, setListaDeportistas] = useState([]);

  // Efecto para cargar los deportistas al montar el componente
  useEffect(() => {
    loadDeportistas(); // Cargar los deportistas al montar el componente
    console.log('Club recibido:', club); 
  }, []);

  // Función para cargar los deportistas del club
  const loadDeportistas = async () => {
    try {
      const response = await api.get(`/api/Club/ListaDeportistas/${club.idClub}`); // Usar el endpoint correcto
      console.log('Datos de deportistas:', response.data);
      setListaDeportistas(response.data);
    } catch (error) {
      console.error('Error cargando deportistas:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'No se pudieron cargar los deportistas');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>DETALLES DEL CLUB</Text>
      <Text style={styles.label}>Nombre del Club</Text>
      <Text style={styles.valor}>{club.nombreClub || 'No disponible'}</Text>

      <Text style={styles.label}>Deportistas:</Text>
      <ScrollView>
        {listaDeportistas.length > 0 ? (
          listaDeportistas.map((deportista) => (
            <View key={deportista.idDep} style={styles.deportistaContainer}>
              <Text style={styles.valor}>{deportista.nombresDep} {deportista.apellidosDep}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.valor}>No hay deportistas registrados en este club.</Text>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.botonRegresar} onPress={() => navigation.goBack()}>
        <Text style={styles.textoBotonRegresar}>Regresar</Text>
      </TouchableOpacity>
    </View>
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
   label: {
     fontSize: 16,
     fontWeight: 'bold',
     marginBottom: 5,
   },
   valor: {
     fontSize: 16,
     marginBottom: 15,
   },
   deportistaContainer: {
     paddingVertical: 5,
     borderBottomWidth: 1,
     borderBottomColor: '#ccc',
   },
   botonRegresar: {
     backgroundColor: '#dc3545',
     padding: 10,
     borderRadius: 5,
   },
   textoBotonRegresar: {
     fontSize:16 ,
     color:'#fff' ,
   },
});

export default DetailsClub;
