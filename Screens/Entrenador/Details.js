import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api'; // Asegúrate de importar tu API

const DetailsEntrenador = ({ route }) => {
  const { entrenador } = route.params; // Obteniendo el entrenador pasado como parámetro
  const navigation = useNavigation();

  // Inicializar listas
  const [listaProvincias, setListaProvincias] = useState([]);

  // Efecto para cargar las listas
  useEffect(() => {
    loadOptions(); // Cargar las opciones al montar el componente
    console.log('Entrenador recibido:', entrenador); 
  }, []);

  // Función para cargar las opciones
  const loadOptions = async () => {
    try {
      // Cargar provincias
      const provinciasResponse = await api.get('/api/Provincia');
      console.log('Datos de provincias:', provinciasResponse.data);
      setListaProvincias(provinciasResponse.data);
    } catch (error) {
      console.error('Error cargando opciones:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'No se pudieron cargar las opciones');
    }
  };

  const getProvinciaNombre = (idPro) => {
    const provincia = listaProvincias.find((provincia) => provincia.idPro === idPro);
    return provincia ? provincia.nombrePro : 'No encontrado';
  };

  const getEstado = (activo) => (activo ? 'Habilitado' : 'Deshabilitado');

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>DETALLES DEL ENTRENADOR</Text>
      <View style={styles.detalleContainer}>
        <Text style={styles.label}>Nombres</Text>
        <Text style={styles.valor}>{entrenador.nombresEnt || 'No disponible'}</Text>

        <Text style={styles.label}>Apellidos</Text>
        <Text style={styles.valor}>{entrenador.apellidosEnt || 'No disponible'}</Text>

        <Text style={styles.label}>Cédula</Text>
        <Text style={styles.valor}>{entrenador.cedulaEnt || 'No disponible'}</Text>

        <Text style={styles.label}>Provincia</Text>
        <Text style={styles.valor}>{getProvinciaNombre(entrenador.idPro)}</Text>

        <Text style={styles.label}>Estado</Text>
        <Text style={styles.valor}>{getEstado(entrenador.activoEnt)}</Text>
      </View>
      
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
   detalleContainer: {
     marginBottom: 20,
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

export default DetailsEntrenador;
