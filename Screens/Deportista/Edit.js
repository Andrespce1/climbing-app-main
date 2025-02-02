import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import api from '../../services/api'; // Asegúrate de importar tu API

const Edit = ({ route }) => {
  const { deportista } = route.params;
  const navigation = useNavigation();

  // Inicializar los estados
  const [nombresDep, setNombresDep] = useState('');
  const [apellidosDep, setApellidosDep] = useState('');
  const [cedulaDep, setCedulaDep] = useState('');
  const [idPro, setIdPro] = useState('');
  const [idUsu, setIdUsu] = useState('');
  const [idCat, setIdCat] = useState('');
  const [idGen, setIdGen] = useState('');
  const [idClub, setIdClub] = useState('');
  const [idEnt, setIdEnt] = useState('');
  const [activoDep, setActivoDep] = useState('');

  // Listas para los selectores
  const [listaProvincias, setListaProvincias] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [listaGeneros, setListaGeneros] = useState([]);
  const [listaClubes, setListaClubes] = useState([]);
  const [listaEntrenadores, setListaEntrenadores] = useState([]);
  const [listaEstados, setListaEstados] = useState([]);

  // Efecto para inicializar los valores del deportista y cargar opciones
  useEffect(() => {
    console.log('Deportista recibido:', deportista);
    if (deportista) {
      setNombresDep(deportista.nombresDep || '');
      setApellidosDep(deportista.apellidosDep || '');
      setCedulaDep(deportista.cedulaDep || '');
      setIdPro(deportista.idPro || '');
      setIdUsu(deportista.idUsu || '');
      setIdCat(deportista.idCat || '');
      setIdGen(deportista.idGen || '');
      setIdClub(deportista.idClub || '');
      setIdEnt(deportista.idEnt || '');
      setActivoDep(deportista.activoDep ? deportista.activoDep.toString() : '');
    }

    loadOptions();
  }, [deportista]);

  const loadOptions = async () => {
    try {
      // Cargar provincias
      const provinciasResponse = await api.get('/api/Provincia');
      console.log('Datos de provincias:', provinciasResponse.data);
      setListaProvincias(provinciasResponse.data);

      // Cargar categorías
      const categoriasResponse = await api.get('/api/Categoria');
      console.log('Datos de categorías:', categoriasResponse.data);
      if (categoriasResponse.status === 200) {
        setListaCategorias(categoriasResponse.data);
      }

      // Cargar géneros
      const generosResponse = await api.get('/api/Genero');
      console.log('Datos de géneros:', generosResponse.data);
      if (generosResponse.status === 200) {
        setListaGeneros(generosResponse.data);
      }

      // Cargar clubes
      const clubesResponse = await api.get('/api/Club');
      console.log('Datos de clubes:', clubesResponse.data);
      if (clubesResponse.status === 200) {
        setListaClubes(clubesResponse.data);
      }

      // Cargar entrenadores
      const entrenadoresResponse = await api.get('/api/Entrenador');
      console.log('Datos de entrenadores:', entrenadoresResponse.data);
      if (entrenadoresResponse.status === 200) {
        setListaEntrenadores(entrenadoresResponse.data);
      }

    } catch (error) {
      console.error('Error cargando opciones:', error.response ? error.response.data : error.message);
    }
  };

  const handleGuardar = async () => {
    try {
      // Crear objeto con los datos a enviar
      const datosDeportista = {
        nombresDep,
        apellidosDep,
        cedulaDep,
        idPro,
        idUsu,
        idCat,
        idGen,
        idClub,
        idEnt,
        activoDep: activoDep === 'true', // Asegúrate de que sea un booleano
        // Puedes añadir otros campos si es necesario
      };

      // Enviar los datos al servidor usando POST
      const response = await api.post('/api/Deportista', datosDeportista);

      console.log('Deportista guardado:', response.data); // Verifica la respuesta del servidor

      // Regresar a la pantalla anterior después de guardar
      navigation.goBack();
    } catch (error) {
      console.error('Error al guardar deportista:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>EDITAR</Text>
      <View style={styles.formContainer}>
        <Text style={styles.subtitulo}>Deportista</Text>
      </View>
      {/* Botones al inicio */}
      <View style={styles.botonesContainer}>
        <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardar}>
          <Text style={styles.textoBotonGuardar}>Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonRegresar} onPress={() => navigation.goBack()}>
          <Text style={styles.textoBotonRegresar}>Regresar</Text>
        </TouchableOpacity>
      </View>

      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombres</Text>
        <TextInput style={styles.input} value={nombresDep} onChangeText={(text) => setNombresDep(text)} />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Apellidos</Text>
        <TextInput style={styles.input} value={apellidosDep} onChangeText={(text) => setApellidosDep(text)} />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Cédula</Text>
        <TextInput style={styles.input} value={cedulaDep} onChangeText={(text) => setCedulaDep(text)} />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombres</Text>
        <TextInput style={styles.input} value={nombresDep} onChangeText={(text) => setNombresDep(text)} />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Apellidos</Text>
        <TextInput style={styles.input} value={apellidosDep} onChangeText={(text) => setApellidosDep(text)} />
      </View>
      

      {/* Selector de Provincia */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Provincia</Text>
        <Picker selectedValue={idPro} style={styles.select} onValueChange={(itemValue) => setIdPro(itemValue)}>
          <Picker.Item label="--Elija la Provincia--" value="" />
          {listaProvincias.map((provincia) => (
            <Picker.Item label={provincia.nombrePro} value={provincia.idPro} key={provincia.idPro} />
          ))}
        </Picker>
      </View>

      {/* Selector de Categoría */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Categoría</Text>
        <Picker selectedValue={idCat} style={styles.select} onValueChange={(itemValue) => setIdCat(itemValue)}>
          <Picker.Item label="--Elija una Categoría--" value="" />
          {listaCategorias.map((categoria) => (
            <Picker.Item label={categoria.nombreCat} value={categoria.idCat} key={categoria.idCat} />
          ))}
        </Picker>
      </View>

      {/* Selector de Género */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Género</Text>
        <Picker selectedValue={idGen} style={styles.select} onValueChange={(itemValue) => setIdGen(itemValue)}>
          <Picker.Item label="--Elija un Género--" value="" />
          {listaGeneros.map((genero) => (
            <Picker.Item label={genero.nombreGen} value={genero.idGen} key={genero.idGen} />
          ))}
        </Picker>
      </View>

      {/* Selector de Club */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Club</Text>
        <Picker selectedValue={idClub} style={styles.select} onValueChange={(itemValue) => setIdClub(itemValue)}>
          <Picker.Item label="--Elija un Club--" value="" />
          {listaClubes.map((club) => (
            <Picker.Item label={club.nombreClub} value={club.idClub} key={club.idClub} />
          ))}
        </Picker>
      </View>

      {/* Selector de Entrenador */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Entrenador</Text>
        <Picker selectedValue={idEnt} style={styles.select} onValueChange={(itemValue) => setIdEnt(itemValue)}>
          <Picker.Item label="--Elija un Entrenador--" value="" />
          {listaEntrenadores.map((entrenador) => (
            <Picker.Item label={`${entrenador.nombresEnt} ${entrenador.apellidosEnt}`} value={entrenador.idEnt} key={entrenador.idEnt} />
          ))}
        </Picker>
      </View>
    </ScrollView>
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
  subtitulo: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  formContainer: {
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  select: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botonGuardar: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  textoBotonGuardar: {
    fontSize: 16,
    color: '#fff',
  },
  botonRegresar: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
  },
  textoBotonRegresar: {
    fontSize: 16,
    color: '#fff',
  },
});

export default Edit;

