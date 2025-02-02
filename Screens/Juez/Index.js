import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import api from '../../services/api'; // Asegúrate de que esta ruta sea correcta

const IndexJuez = ({ navigation }) => {
  const [jueces, setJueces] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJueces, setFilteredJueces] = useState([]); // Estado para los jueces filtrados
  const [isAdminOrEntrenador, setIsAdminOrEntrenador] = useState(false);

  useEffect(() => {
    loadJueces();
    checkUserRole(); // Simulando User.IsInRole
  }, []);

  const loadJueces = async () => {
    try {
      const response = await api.get('/api/Juez');
      console.log('Datos de jueces:', response.data); // Verifica aquí que los datos son correctos
      setJueces(response.data);
    } catch (error) {
      console.error('Error cargando jueces:', error);
    }
  };


  const checkUserRole = () => {
    setIsAdminOrEntrenador(true); // Cambiar según la lógica de autenticación
  };

  const handleSearch = (text) => {
    setSearchQuery(text); // Actualiza el estado de searchQuery

    if (!text.trim()) {
      loadJueces(); // Si el campo está vacío, recarga todos los jueces
      return;
    }

    const filtered = jueces.filter(jueces => {
      const nombres = jueces.nombresJuez ? jueces.nombresJuez.toLowerCase() : '';
      const apellidos = jueces.apellidosJuez ? jueces.apellidosJuez.toLowerCase() : '';
      const cedula = jueces.cedulaJuez ? jueces.cedulaJuez.toLowerCase() : '';

      return (
        nombres.includes(text.toLowerCase()) ||
        apellidos.includes(text.toLowerCase()) ||
        cedula.includes(text)
      );
    });

    console.log('Resultados filtrados:', filtered); // Imprime los resultados filtrados
    setJueces(filtered); // Actualiza el estado con los resultados filtrados
  };


  const handleCreate = () => {
    navigation.navigate('CreateJuez'); // Redirigir a la pantalla de creación
  };

  const handleEdit = (idJuez) => {
    // Encuentra el juez por ID
    const juez = jueces.find(j => j.idJuez === idJuez);
  
    // Verifica si se encontró el juez
    if (juez) {
      console.log('Juez encontrado:', juez); // Verifica que se haya encontrado
      console.log('ID del juez:', juez.idJuez); // Verifica que el ID esté definido
  
      // Navega a la pantalla de edición con el objeto juez
      navigation.navigate('EditJuez', { juez });
    } else {
      console.error('Juez no encontrado con ID:', idJuez);
      Alert.alert('Error', 'No se encontró el juez seleccionado.');
    }
  };

  const handleDetails = (idJuez) => {
    const juezSeleccionado = jueces.find(j => j.idJuez === idJuez);
    
    if (juezSeleccionado) {
      navigation.navigate('DetailsJuez', { juez: juezSeleccionado });
    } else {
      console.error('Juez no encontrado con ID:', idJuez);
    }
  };

  const handleDisable = (id) => {
    // Muestra una alerta de confirmación
    Alert.alert(
      'Confirmar Eliminación',
      '¿Estás seguro de que deseas eliminar este juez?',
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
              await api.delete(`/api/Juez/${id}`);
              setJueces(jueces.filter(j => j.idJuez !== id));
              Alert.alert('Éxito', 'Juez eliminado con éxito');
            } catch (err) {
              console.error(err);
              Alert.alert('Error', 'No se pudo eliminar el Juez');
            }
          },
        },
      ],
      { cancelable: false } // Evita que se cierre al tocar fuera del diálogo
    );
  };

  return (
    <View style={styles.container}>
      {isAdminOrEntrenador && (
        <View style={styles.adminSection}>
          <Text style={styles.adminTitle}>ADMINISTRACIÓN DE JUECES</Text>
          <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
            <Text style={styles.createButtonText}>Crear Juez</Text>
          </TouchableOpacity>
        </View>
      )}


      <TextInput
        value={searchQuery}
        onChangeText={handleSearch} // Llama a handleSearch directamente
        placeholder="Buscar ..."
        style={styles.searchInput}
      />

      <FlatList
        data={jueces}
        renderItem={({ item }) => {
          return (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>Nombres: {item.nombresJuez}</Text>
              <Text style={styles.itemText}>Apellidos: {item.apellidosJuez}</Text>
              <Text style={styles.itemText}>Cédula: {item.cedulaJuez}</Text>

              {isAdminOrEntrenador && (
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity onPress={() => handleEdit(item.idJuez)} style={[styles.button, styles.editButton]}>
                    <Text style={styles.buttonText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDetails(item.idJuez)} style={[styles.button, styles.detailsButton]}>
                    <Text style={styles.buttonText}>Detalles</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDisable(item.idJuez)} style={[styles.button, styles.disableButton]}>
                    <Text style={styles.buttonText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        }}
        keyExtractor={(item) => item.idJuez.toString()}
        ListEmptyComponent={<Text>No hay jueces disponibles.</Text>} // Mensaje cuando no hay datos
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  adminSection: {
    marginBottom: 15,
    alignItems: 'center',
  },
  adminTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  createButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 2,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  searchButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 2,
    alignItems: 'center',
    marginBottom: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 1,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    elevation: 2,
    width: '30%',
  },
  editButton: {
    backgroundColor: '#007bff',
  },
  detailsButton: {
    backgroundColor: '#17a2b8',
  },
  disableButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  }
});

export default IndexJuez;
