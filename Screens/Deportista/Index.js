import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Create from './Create';
import EditarDeportista from './Edit';
import DetailsDeportista from './Details';
import DeleteDeportista from './Delete';

import api from '../../services/api';

const Index = ({ navigation }) => {
  const [deportistas, setDeportistas] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdminOrEntrenador, setIsAdminOrEntrenador] = useState(false);

  useEffect(() => {
    // Llamar a la API para obtener datos
    loadDeportistas();
    checkUserRole(); // Simulando User.IsInRole
  }, []);

  const loadDeportistas = async () => {
    try {
      const response = await api.get('/api/Deportista'); // Llamada a la API para obtener deportistas
      const deportistasConDetalles = await Promise.all(response.data.map(async (deportista) => {
        // Obtener detalles asociados a cada deportista usando sus ids
        const categoria = await loadCategoria(deportista.idCat);
        const club = await loadClub(deportista.idClub);
        const entrenador = await loadEntrenador(deportista.idEnt);
        const genero = await loadGenero(deportista.idGen);
        const provincia = await loadProvincia(deportista.idPro);

        return {
          ...deportista,
          idCatNavigation: categoria,
          idClubNavigation: club,
          idEntNavigation: entrenador,
          idGenNavigation: genero,
          idProNavigation: provincia
        };
      }));
      setDeportistas(deportistasConDetalles);
    } catch (error) {
      console.error('Error cargando deportistas:', error);
    }
  };

  const loadCategoria = async (idCat) => {
    try {
      const response = await api.get(`/api/Categoria/${idCat}`);
      return response.data ? { idCat: response.data.idCat, nombreCat: response.data.nombreCat } : { idCat: null, nombreCat: 'Sin categoría' };
    } catch (error) {
      return { idCat: null, nombreCat: 'Sin categoría' };
    }
  };

  const loadClub = async (idClub) => {
    try {
      const response = await api.get(`/api/Club/${idClub}`);
      return response.data ? { idClub: response.data.idClub, nombreClub: response.data.nombreClub } : { idClub: null, nombreClub: 'Sin club' };
    } catch (error) {
      return { idClub: null, nombreClub: 'Sin club' };
    }
  };

  const loadEntrenador = async (idEnt) => {
    try {
      const response = await api.get(`/api/Entrenador/${idEnt}`);
      return response.data ? { idEnt: response.data.idEnt, nombreEnt: `${response.data.nombresEnt} ${response.data.apellidosEnt}` } : { idEnt: null, nombreEnt: 'Sin entrenador' };
    } catch (error) {
      return { idEnt: null, nombreEnt: 'Sin entrenador' };
    }
  };

  const loadGenero = async (idGen) => {
    try {
      const response = await api.get(`/api/Genero/${idGen}`);
      return response.data ? { idGen: response.data.idGen, nombreGen: response.data.nombreGen } : { idGen: null, nombreGen: 'Sin género' };
    } catch (error) {
      return { idGen: null, nombreGen: 'Sin género' };
    }
  };

  const loadProvincia = async (idPro) => {
    try {
      const response = await api.get(`/api/Provincia/${idPro}`);
      return response.data ? { idPro: response.data.idPro, nombrePro: response.data.nombrePro } : { idPro: null, nombrePro: 'Sin provincia' };
    } catch (error) {
      return { idPro: null, nombrePro: 'Sin provincia' };
    }
  };

  const checkUserRole = () => {
    // Simulando la verificación de rol
    setIsAdminOrEntrenador(true); // Cambiar según la lógica de autenticación
  };

  // Método de búsqueda en tiempo real
  const handleSearch = (text) => {
    setSearchQuery(text); // Actualiza el estado de searchQuery

    if (!text.trim()) {
      loadDeportistas(); // Si el campo está vacío, recarga todos los deportistas
      return;
    }

    // Filtrar deportistas según la búsqueda
    const filtered = deportistas.filter(deportista => {
      const nombres = deportista.nombresDep ? deportista.nombresDep.toLowerCase() : '';
      const apellidos = deportista.apellidosDep ? deportista.apellidosDep.toLowerCase() : '';
      const cedula = deportista.cedulaDep ? deportista.cedulaDep.toLowerCase() : '';

      return (
        nombres.includes(text.toLowerCase()) ||
        apellidos.includes(text.toLowerCase()) ||
        cedula.includes(text)
      );
    });

    console.log('Resultados filtrados:', filtered); // Imprime los resultados filtrados
    setDeportistas(filtered); // Actualiza el estado con los resultados filtrados
  };

  const handleCreate = () => {
    navigation.navigate('CreateDeportista'); // Redirigir a CrearDeportista
  };

  const handleEdit = (idDep) => {
    // Encuentra el deportista por ID
    const deportista = deportistas.find(d => d.idDep === idDep);
    
    // Verifica si se encontró el deportista
    if (deportista) {
      console.log('Deportista encontrado:', deportista); // Verifica que se haya encontrado
      navigation.navigate('EditDeportista', { deportista }); // Pasa el objeto deportista completo
    } else {
      console.error('Deportista no encontrado con ID:', idDep);
    }
  };

  const handleDetails = (idDep) => {
    const deportista = deportistas.find(d => d.idDep === idDep);
    if (deportista) {
      navigation.navigate('DetailsDeportista', { deportista }); // Pasa el objeto deportista completo
    } else {
      console.error('Deportista no encontrado con ID:', idDep);
    }
  };
  

  const handleDisable = async (idDep) => {
    try {
      const deportista = deportistas.find(d => d.idDep === idDep);
      if (!deportista) {
        console.error('Deportista no encontrado con ID:', idDep);
        return;
      }

      // Realiza la solicitud para deshabilitar al deportista
      const response = await api.put(`/api/Deportista/${idDep}`, { activoDep: false });
      
      console.log('Deportista deshabilitado:', response.data); // Verifica la respuesta del servidor

      // Actualiza el estado local para reflejar los cambios
      setDeportistas((prevDeportistas) =>
        prevDeportistas.map((d) =>
          d.idDep === idDep ? { ...d, activoDep: false } : d
        )
      );
    } catch (error) {
      console.error('Error al deshabilitar deportista:', error.response ? error.response.data : error.message);
    }
  };


  return (
    <View style={styles.container}>
      {isAdminOrEntrenador && (
        <View style={styles.adminSection}>
          <Text style={styles.adminTitle}>ADMINISTRACIÓN DE DEPORTISTAS</Text>
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
        data={deportistas}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Nombres: {item.nombresDep}</Text>
            <Text style={styles.itemText}>Apellidos: {item.apellidosDep}</Text>
            <Text style={styles.itemText}>Cédula: {item.cedulaDep}</Text>
            <Text style={styles.itemText}>Categoría: {item.idCatNavigation.nombreCat || 'Sin categoría'}</Text>
            <Text style={styles.itemText}>Club: {item.idClubNavigation.nombreClub || 'Sin club'}</Text>
            <Text style={styles.itemText}>Entrenador: {item.idEntNavigation.nombreEnt || 'Sin entrenador'}</Text>
            <Text style={styles.itemText}>Género: {item.idGenNavigation.nombreGen || 'Sin género'}</Text>
            <Text style={styles.itemText}>Provincia: {item.idProNavigation.nombrePro || 'Sin provincia'}</Text>
            <Text style={styles.itemText}>Estado: {item.activoDep ? 'Activo' : 'Inactivo'}</Text>

            {isAdminOrEntrenador && (
              <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => handleEdit(item.idDep)} style={[styles.button, styles.editButton]}>
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDetails(item.idDep)} style={[styles.button, styles.detailsButton]}>
                  <Text style={styles.buttonText}>Detalles</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDisable(item.idDep)} style={[styles.button, styles.disableButton]}>
                  <Text style={styles.buttonText}>Deshabilitar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        keyExtractor={(item) => item.IdDep ? item.IdDep.toString() : String(item.id || Math.random())}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  adminSection: {
    marginBottom: 15,
  },
  adminTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  itemContainer: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
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
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
    flexGrow:1,
   },
   editButton:{
     backgroundColor:'#4CAF50',
     marginRight :5 ,
   },
   detailsButton:{
     backgroundColor:'#2196F3',
     marginHorizontal :5 ,
   },
   disableButton:{
     backgroundColor:'#f44336',
     marginLeft :5 ,
   },
   buttonText:{
     color:'#fff',
     fontSize :16 ,
   },
});

export default Index;
