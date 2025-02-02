import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation
import api from '../../services/api'; // Asegúrate de importar tu instancia de API

const IndexSede = () => {
  const navigation = useNavigation(); // Inicializa useNavigation
  const [sedes, setSedes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newSedeName, setNewSedeName] = useState('');

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const response = await api.get('/api/Sede'); // Cambia según tu API
        console.log('Respuesta de la API:', response.data); // Imprime la respuesta
        setSedes(response.data);        
      } catch (err) {
        console.error(err);
        setError('Error al cargar las sedes');
      } finally {
        setLoading(false);
      }
    };

    fetchSedes();
  }, []);

  const handleCreateSede = async () => {
    try {
      const response = await api.post('/api/Sede', { nombreSede: newSedeName });
      setSedes([...sedes, response.data]);
      setNewSedeName('');
      Alert.alert('Éxito', 'Sede creada con éxito');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudo crear la sede');
    }
  };

  const handleEditSede = (idSede) => {
    const sede = sedes.find(s => s.idSede === idSede);

    if (sede) {
      console.log('Sede encontrado:', sede); // Verifica que se haya encontrado
      navigation.navigate('SedeEdit', { sede }); // Pasa el objeto completo
    } else {
      console.error('Sede no encontrado con ID:', idSede);
    }
  };

  const handleDetailsSede = async (id) => {
    try {
      const response = await api.get(`/api/Sede/${id}`);
      navigation.navigate('DetallesSede', { sede: response.data });
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudo obtener los detalles de la sede');
    }
  };

  const handleDeleteSede = async (id) => {
    try {
      await api.delete(`/api/Sede/${id}`);
      setSedes(sedes.filter(sede => sede.idSede !== id));
      Alert.alert('Éxito', 'Sede eliminada con éxito');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudo eliminar la sede');
    }
  };

  if (loading) {
    return <Text style={styles.loadingText}>Cargando...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  if (!sedes || sedes.length === 0) {
    return <Text style={styles.emptyText}>No hay sedes disponibles.</Text>;
  }

  const renderItem = ({ item }) => (
    <View style={styles.sede}>
      <Text style={styles.label}>Nombre de la Sede:</Text>
      <Text style={styles.value}>{item.nombreSede}</Text>
      
      {/* Botones para Editar y Eliminar */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleEditSede(item.idSede)}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleDetailsSede(item.idSede)}>
          <Text style={styles.buttonText}>Detalles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleDeleteSede(item.idSede)}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sedes}
        keyExtractor={(item) => item.idSede.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }} // Añadir espacio en la parte inferior
      />
      
      <TextInput
        style={styles.input}
        placeholder="Nombre de la nueva sede"
        value={newSedeName}
        onChangeText={setNewSedeName}
      />
      
      <TouchableOpacity style={styles.createButton} onPress={handleCreateSede}>
        <Text style={styles.createButtonText}>Crear Sede</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 18,
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
   },
   sede:{
       padding :15 ,
       backgroundColor:'#ffffff' ,
       borderRadius :10 ,
       elevation :3 ,
       marginBottom :15 ,
   },
   label:{
       fontWeight:'bold' ,
       marginBottom :5 ,
   },
   value:{
       marginBottom :10 ,
   },
   buttonContainer:{
       flexDirection:'row' ,
       justifyContent:'space-between' ,
       marginTop :10 ,
   },
   button:{
       backgroundColor:'#007bff' ,
       paddingVertical :10 ,
       paddingHorizontal :15 ,
       borderRadius :5 ,
       elevation :2 ,
       flexGrow :1 ,
       marginHorizontal :5 ,
   },
   deleteButton:{
       backgroundColor:'#dc3545' ,
   },
   buttonText:{
       color:'#fff' ,
       textAlign:'center' ,
       fontWeight:'bold' ,
   },
   input:{
       height :40 ,
       borderColor :'gray' ,
       borderWidth :1 ,
       marginBottom :10 ,
       paddingHorizontal :10 ,
   },
   createButton:{
       backgroundColor:'#28a745' ,
       paddingVertical :10 ,
       borderRadius :5 ,
   },
   createButtonText:{
       color:'#fff' ,
       textAlign:'center' ,
       fontWeight:'bold' ,
   },
});

export default IndexSede;
