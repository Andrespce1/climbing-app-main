import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api'; // Asegúrate de importar tu API

const Details = ({ route }) => {
  const { deportista } = route.params; // Obteniendo el deportista pasado como parámetro
  const navigation = useNavigation();

  // Inicializar listas
  const [listaCategorias, setListaCategorias] = useState([]);
  const [listaClubes, setListaClubes] = useState([]);
  const [listaEntrenadores, setListaEntrenadores] = useState([]);
  const [listaGeneros, setListaGeneros] = useState([]);
  const [listaProvincias, setListaProvincias] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([]);

  // Efecto para cargar las listas
  useEffect(() => {
    loadOptions(); // Cargar las opciones al montar el componente
    console.log('Deportista recibido:', deportista); 
  }, []);

  // Función para cargar las opciones
  const loadOptions = async () => {
    try {
      // Cargar categorías
      const categoriasResponse = await api.get('/api/Categoria');
      console.log('Datos de categorías:', categoriasResponse.data);
      setListaCategorias(categoriasResponse.data);

      // Cargar clubes
      const clubesResponse = await api.get('/api/Club');
      console.log('Datos de clubes:', clubesResponse.data);
      setListaClubes(clubesResponse.data);

      // Cargar entrenadores
      const entrenadoresResponse = await api.get('/api/Entrenador');
      console.log('Datos de entrenadores:', entrenadoresResponse.data);
      setListaEntrenadores(entrenadoresResponse.data);

      // Cargar géneros
      const generosResponse = await api.get('/api/Genero');
      console.log('Datos de géneros:', generosResponse.data);
      setListaGeneros(generosResponse.data);

      // Cargar provincias
      const provinciasResponse = await api.get('/api/Provincia');
      console.log('Datos de provincias:', provinciasResponse.data);
      setListaProvincias(provinciasResponse.data);

      // Cargar usuarios (si aplica)
      const usuariosResponse = await api.get('/api/Usuario');
      console.log('Datos de usuarios:', usuariosResponse.data);
      setListaUsuarios(usuariosResponse.data);

    } catch (error) {
      console.error('Error cargando opciones:', error.response ? error.response.data : error.message);
    }
  };

  // Funciones para obtener nombres
  const getCategoriaNombre = (idCat) => {
    const categoria = listaCategorias.find((categoria) => categoria.idCat === idCat);
    return categoria ? categoria.nombreCat : 'No encontrado';
  };

  const getClubNombre = (idClub) => {
    const club = listaClubes.find((club) => club.idClub === idClub);
    return club ? club.nombreClub : 'No encontrado';
  };

  const getEntrenadorNombre = (idEnt) => {
    const entrenador = listaEntrenadores.find((entrenador) => entrenador.idEnt === idEnt);
    return entrenador ? `${entrenador.nombresEnt} ${entrenador.apellidosEnt}` : 'No encontrado';
  };

  const getGeneroNombre = (idGen) => {
    const genero = listaGeneros.find((genero) => genero.idGen === idGen);
    return genero ? genero.nombreGen : 'No encontrado';
  };

  const getProvinciaNombre = (idPro) => {
    const provincia = listaProvincias.find((provincia) => provincia.idPro === idPro);
    return provincia ? provincia.nombrePro : 'No encontrado';
  };

  const getUsuarioNombre = (idUsu) => {
    const usuario = listaUsuarios.find((usuario) => usuario.idUsu === idUsu);
    return usuario ? usuario.nombreUsu : 'No encontrado';
  };

  const getEstado = (activo) => (activo ? 'Activo' : 'Inactivo');

  // Manejo del botón editar
  const handleEditar = () => {
    navigation.navigate('EditarDeportista', { id: deportista.IdDep });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>DETALLES</Text>
      <View style={styles.detalleContainer}>
        <Text style={styles.label}>Nombres</Text>
        <Text style={styles.valor}>{deportista.nombresDep || 'No disponible'}</Text>

        <Text style={styles.label}>Apellidos</Text>
        <Text style={styles.valor}>{deportista.apellidosDep || 'No disponible'}</Text>

        <Text style={styles.label}>Cédula</Text>
        <Text style={styles.valor}>{deportista.cedulaDep || 'No disponible'}</Text>

        <Text style={styles.label}>Categoría</Text>
        <Text style={styles.valor}>{getCategoriaNombre(deportista.idCat)}</Text>

        <Text style={styles.label}>Club</Text>
        <Text style={styles.valor}>{getClubNombre(deportista.idClub)}</Text>

        <Text style={styles.label}>Entrenador</Text>
        <Text style={styles.valor}>{getEntrenadorNombre(deportista.idEnt)}</Text>

        <Text style={styles.label}>Genero</Text>
        <Text style={styles.valor}>{getGeneroNombre(deportista.idGen)}</Text>

        <Text style={styles.label}>Provincia</Text>
        <Text style={styles.valor}>{getProvinciaNombre(deportista.idPro)}</Text>

        <Text style={styles.label}>Usuario</Text>
        <Text style={styles.valor}>{getUsuarioNombre(deportista.idUsu)}</Text>

        <Text style={styles.label}>Estado</Text>
        <Text style={styles.valor}>{getEstado(deportista.activoDep)}</Text>
      </View>
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
   botonesContainer: {
     flexDirection: 'row',
     justifyContent: 'space-between',
   },
   botonEditar: {
     backgroundColor: '#ffc107',
     padding: 10,
     borderRadius: 5,
   },
   textoBotonEditar: {
     fontSize: 16,
     color: '#fff',
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

export default Details;

