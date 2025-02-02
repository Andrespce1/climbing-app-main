import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation
import api from '../../services/api'; // Asegúrate de importar tu instancia de API

const IndexClub = () => {
  const navigation = useNavigation(); // Inicializa useNavigation
  const [clubes, setClubes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newClubName, setNewClubName] = useState('');

  useEffect(() => {
    const fetchClubes = async () => {
      try {
        const response = await api.get('/api/Club'); // Cambia según tu API
        console.log('Respuesta de la API:', response.data); // Imprime la respuesta
        setClubes(response.data);        
      } catch (err) {
        console.error(err);
        setError('Error al cargar los clubes');
      } finally {
        setLoading(false);
      }
    };

    fetchClubes();
  }, []);

  const handleCreateClub = async () => {
    try {
      const response = await api.post('/api/Club', { nombreClub: newClubName });
      setClubes([...clubes, response.data]);
      setNewClubName('');
      Alert.alert('Éxito', 'Club creado con éxito');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudo crear el club');
    }
  };

  const handleEditClub = (idClub) => {
    const club = clubes.find(e => e.idClub === idClub);

    if (club) {
      console.log('Club encontrado:', club); // Verifica que se haya encontrado
      navigation.navigate('ClubEdit', { club }); // Pasa el objeto completo
    } else {
      console.error('Entrenador no encontrado con ID:', idClub);
    }
  };

  const handleDetailsClub = (idClub) => {
    const club = clubes.find(c => c.idClub === idClub);
    if (club) {
      navigation.navigate('ClubDetails', { club }); // Pasa el objeto deportista completo
    } else {
      console.error('Club no encontrado con ID:', idClub);
    }
  };

  const handleDeleteClub = (id) => {
    // Muestra una alerta de confirmación
    Alert.alert(
      'Confirmar Eliminación',
      '¿Estás seguro de que deseas eliminar este Club?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Eliminación cancelada'),
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              await api.delete(`/api/Club/${id}`);
              setClubes(clubes.filter(c => c.idClub !== id));
              Alert.alert('Éxito', 'Club eliminado con éxito');
            } catch (err) {
              console.error(err);
              Alert.alert('Error', 'No se pudo eliminar el Club porque tiene deportistas asociados');
            }
          },
        },
      ],
      { cancelable: false } // Evita que se cierre al tocar fuera del diálogo
    );
  };

  if (loading) {
    return <Text style={styles.loadingText}>Cargando...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  if (!clubes || clubes.length === 0) {
    return <Text style={styles.emptyText}>No hay clubes disponibles.</Text>;
  }

  const renderItem = ({ item }) => (
    <View style={styles.club}>
      <Text style={styles.label}>Nombre del Club:</Text>
      <Text style={styles.value}>{item.nombreClub}</Text>
      
      {/* Botones para Editar y Eliminar */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleEditClub(item.idClub)}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleDetailsClub(item.idClub)}>
          <Text style={styles.buttonText}>Detalles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleDeleteClub(item.idClub)}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={clubes}
        keyExtractor={(item) => item.idClub.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }} // Añadir espacio en la parte inferior
      />
      
      <TextInput
        style={styles.input}
        placeholder="Nombre del nuevo club"
        value={newClubName}
        onChangeText={setNewClubName}
      />
      
      <TouchableOpacity style={styles.createButton} onPress={handleCreateClub}>
        <Text style={styles.createButtonText}>Crear Club</Text>
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
  club: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 3,
    marginBottom: 15,
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

export default IndexClub;

