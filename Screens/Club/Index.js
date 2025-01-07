import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TextInput, Button } from 'react-native';
import api from '../../services/api'; // Asegúrate de importar tu instancia de API

const Index = () => {
  const [clubes, setClubes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deportistas, setDeportistas] = useState({}); // Estado para almacenar deportistas por club
  const [newClubName, setNewClubName] = useState('');

  useEffect(() => {
    const fetchClubes = async () => {
      try {
        const response = await api.get('/api/Club'); // Cambia según tu API
        console.log('Respuesta de la API:', response.data); // Imprime la respuesta
        setClubes(response.data);

        // Llamar a la API para obtener deportistas por cada club
        for (const club of response.data) {
          const deportistaResponse = await api.get(`/api/Club/ListaDeportistas/${club.idClub}`);
          console.log('Respuesta Deportistas:', deportistaResponse.data); // Imprime la respuesta de deportistas

          // Verifica si deportistaResponse.data es un array
          if (Array.isArray(deportistaResponse.data)) {
            setDeportistas(prev => ({ ...prev, [club.idClub]: deportistaResponse.data }));
          } else {
            console.error('La respuesta no es un array:', deportistaResponse.data);
          }
        }
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

  const handleEditClub = (id) => {
    navigation.navigate('EditarClub', { idClub: id });
  };

  const handleDeleteClub = async (id) => {
    try {
      await api.delete(`/api/Club/${id}`);
      setClubes(clubes.filter(club => club.idClub !== id));
      Alert.alert('Éxito', 'Club eliminado con éxito');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudo eliminar el club');
    }
  };

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!clubes || clubes.length === 0) {
    return <Text>No hay clubes disponibles.</Text>;
  }

  const renderItem = ({ item }) => (
    <View style={styles.club}>
      <Text style={styles.label}>Nombre del Club:</Text>
      <Text style={styles.value}>{item.nombreClub}</Text>
      <Text style={styles.label}>Deportistas:</Text>
      {Array.isArray(deportistas[item.idClub]) && deportistas[item.idClub].length > 0 ? (
        deportistas[item.idClub].map((deportista) => (
          <Text key={deportista.id} style={styles.value}>
            {deportista.nombresDep} {deportista.apellidosDep}
          </Text>
        ))
      ) : (
        <Text>No hay deportistas disponibles.</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={clubes}
        keyExtractor={(item) => item.idClub.toString()}
        renderItem={renderItem}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Nombre del nuevo club"
        value={newClubName}
        onChangeText={setNewClubName}
      />
      
      <Button title="Crear Club" onPress={handleCreateClub} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  club: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    marginBottom: 10,
  },
});

export default Index;
