import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import api from '../../services/api'; // Asegúrate de que esta ruta sea correcta

const IndexEntrenador = ({ navigation }) => {
  const [entrenadores, setEntrenadores] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdminOrEntrenador, setIsAdminOrEntrenador] = useState(false);

  useEffect(() => {
    loadEntrenadores(); // Llamar a la API para obtener datos
    checkUserRole(); // Simulando User.IsInRole
  }, []);

  const loadEntrenadores = async () => {
    try {
      const response = await api.get('/api/Entrenador'); // Llamada a la API para obtener entrenadores
      console.log('Datos de Entrenador:', response.data); // Verifica aquí que los datos son correctos
      setEntrenadores(response.data);
    } catch (error) {
      console.error('Error cargando Entrenadores:', error);
    }
  };

  const checkUserRole = () => {
    setIsAdminOrEntrenador(true); // Cambiar según la lógica de autenticación
  };

  const handleSearch = (text) => {
    setSearchQuery(text); // Actualiza el estado de searchQuery

    if (!text.trim()) {
      loadEntrenadores(); // Si el campo está vacío, recarga todos los jueces
      return;
    }

    const filtered = entrenadores.filter(entrenador => {
      const nombres = entrenador.nombresEnt ? entrenador.nombresEnt.toLowerCase() : '';
      const apellidos = entrenador.apellidosEnt ? entrenador.apellidosEnt.toLowerCase() : '';
      const cedula = entrenador.cedulaEnt ? entrenador.cedulaEnt.toLowerCase() : '';

      return (
        nombres.includes(text.toLowerCase()) ||
        apellidos.includes(text.toLowerCase()) ||
        cedula.includes(text)
      );
    });

    console.log('Resultados filtrados:', filtered); // Imprime los resultados filtrados
    setEntrenadores(filtered); // Actualiza el estado con los resultados filtrados
  };


  const handleCreate = () => {
    navigation.navigate('CreateEntrenador'); // Redirigir a CrearEntrenador
  };

  const handleEdit = (idEnt) => {
    const entrenador = entrenadores.find(e => e.idEnt === idEnt);

    if (entrenador) {
      console.log('Entrenador encontrado:', entrenador); // Verifica que se haya encontrado
      navigation.navigate('EditEntrenador', { entrenador }); // Pasa el objeto completo
    } else {
      console.error('Entrenador no encontrado con ID:', idEnt);
    }
  };

  const handleDetails = (idEnt) => {
    const entrenador = entrenadores.find(d => d.idEnt === idEnt);
    if (entrenador) {
      navigation.navigate('DetailsEntrenador', { entrenador }); // Pasa el objeto entrenador completo
    } else {
      console.error('Entrenador no encontrado con ID:', idEnt);
    }
  };

  const handleDelete = (id) => {
    // Muestra una alerta de confirmación
    Alert.alert(
      'Confirmar Eliminación',
      '¿Estás seguro de que deseas eliminar este Entrenador?',
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
              await api.delete(`/api/Entrenador/${id}`);
              setEntrenadores(entrenadores.filter(j => j.idEntrenador !== id));
              Alert.alert('Éxito', 'Entrenador eliminado con éxito');
            } catch (err) {
              console.error(err);
              Alert.alert('Error', 'No se pudo eliminar el Entrenador');
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
          <Text style={styles.adminTitle}>ADMINISTRACIÓN DE ENTRENADORES</Text>
          <Button title="Crear" onPress={handleCreate} />
        </View>
      )}

      <TextInput
        value={searchQuery}
        onChangeText={handleSearch} // Llama a handleSearch al cambiar el texto
        placeholder="Buscar ..."
        style={styles.searchInput}
      />

      <FlatList
        data={entrenadores}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Nombres: {item.nombresEnt}</Text>
            <Text style={styles.itemText}>Apellidos: {item.apellidosEnt}</Text>
            <Text style={styles.itemText}>Cédula: {item.cedulaEnt}</Text>
            <Text style={styles.itemText}>Estado: {item.activoEnt ? 'Activo' : 'Inactivo'}</Text>

            {isAdminOrEntrenador && (
              <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => handleEdit(item.idEnt)} style={[styles.button, styles.editButton]}>
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDetails(item.idEnt)} style={[styles.button, styles.detailsButton]}>
                  <Text style={styles.buttonText}>Detalles</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.idEnt)} style={[styles.button, styles.deleteButton]}>
                  <Text style={styles.buttonText}>Deshabilitar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        keyExtractor={(item) => item.idEnt.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
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
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
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
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  }
});

export default IndexEntrenador;
