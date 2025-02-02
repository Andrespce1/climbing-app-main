import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation
import api from '../../services/api'; // Asegúrate de importar tu instancia de API

const IndexCompetencia = () => {
  const navigation = useNavigation(); // Inicializa useNavigation
  const [competencias, setCompetencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCompetencias = async () => {
      try {
        const response = await api.get('/api/Competencia'); // Cambia según tu API
        console.log('Respuesta de la API:', response.data); // Imprime la respuesta
        setCompetencias(response.data);        
      } catch (err) {
        console.error(err);
        setError('Error al cargar las competencias');
      } finally {
        setLoading(false);
      }
    };

    fetchCompetencias();
  }, []);

  const handleSearch = () => {
    const filtered = competencias.filter(competencia =>
      competencia.nombreCom.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCompetencias(filtered);
  };

  const handleCreateCompetencia = () => {
    navigation.navigate('CrearCompetencia'); // Navega a la pantalla de creación
  };

  const handleEditCompetencia = (id) => {
    navigation.navigate('EditarCompetencia', { idCom: id }); // Navega a la pantalla de edición
  };

  const handleDetailsCompetencia = (id) => {
    navigation.navigate('DetallesCompetencia', { idCom: id }); // Navega a la pantalla de detalles
  };

  const handleDeleteCompetencia = async (id) => {
    try {
      await api.delete(`/api/Competencia/${id}`);
      setCompetencias(competencias.filter(competencia => competencia.IdCom !== id));
      Alert.alert('Éxito', 'Competencia eliminada con éxito');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudo eliminar la competencia');
    }
  };

  if (loading) {
    return <Text style={styles.loadingText}>Cargando...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  if (!competencias || competencias.length === 0) {
    return <Text style={styles.emptyText}>No hay competencias disponibles.</Text>;
  }

  const renderItem = ({ item }) => (
    <View style={styles.competencia}>
      <Text style={styles.label}>Nombre de la Competencia:</Text>
      <Text style={styles.value}>{item.nombreCom}</Text>
      
      {/* Botones para Editar y Eliminar */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleEditCompetencia(item.idCom)}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleDetailsCompetencia(item.idCom)}>
          <Text style={styles.buttonText}>Detalles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleDeleteCompetencia(item.idCom)}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LISTADO DE COMPETENCIAS</Text>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar competencias..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={competencias}
        keyExtractor={(item) => item.idCom.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }} // Añadir espacio en la parte inferior
      />
      
      <TouchableOpacity style={styles.createButton} onPress={handleCreateCompetencia}>
        <Text style={styles.createButtonText}>Crear Competencia</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
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
   competencia:{
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
   searchContainer:{
       flexDirection:'row',
       justifyContent:'space-between',
       marginBottom:10,
   },
   searchButton:{
       backgroundColor:'#28a745',
       paddingVertical:10,
       paddingHorizontal:15,
       borderRadius:5,
   },
   searchButtonText:{
       color:'#fff',
       fontWeight:'bold',
   },
   createButton:{
       backgroundColor:'#007bff' ,
       paddingVertical :10 ,
       borderRadius :5 ,
   },
   createButtonText:{
       color:'#fff' ,
       textAlign:'center' ,
       fontWeight:'bold' ,
   },
});

export default IndexCompetencia;
