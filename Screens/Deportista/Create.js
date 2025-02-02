import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import api from '../../services/api'; // Asegúrate de importar tu instancia de API

const CreateDeportista = () => {
  const navigation = useNavigation();
  const [nombresDep, setNombresDep] = useState('');
  const [apellidosDep, setApellidosDep] = useState('');
  const [cedulaDep, setCedulaDep] = useState('');
  const [idPro, setIdPro] = useState('');
  const [idCat, setIdCat] = useState('');
  const [idGen, setIdGen] = useState('');
  const [idClub, setIdClub] = useState('');
  const [idEnt, setIdEnt] = useState('');
  const [activoDep, setActivoDep] = useState(true); // Por defecto activo
  const [listaProvincias, setListaProvincias] = useState([]);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [listaGeneros, setListaGeneros] = useState([]);
  const [listaClubes, setListaClubes] = useState([]);
  const [listaEntrenadores, setListaEntrenadores] = useState([]);

  useEffect(() => {
    // Cargar las listas necesarias desde la API
    const fetchData = async () => {
      try {
        const [provinciasResponse, categoriasResponse, generosResponse, clubesResponse, entrenadoresResponse] = await Promise.all([
          api.get('/api/Provincia'),
          api.get('/api/Categoria'),
          api.get('/api/Genero'),
          api.get('/api/Club'),
          api.get('/api/Entrenador'),
        ]);

        console.log('Provincias:', provinciasResponse.data); // Imprime la respuesta
        console.log('Categorías:', categoriasResponse.data); // Imprime la respuesta
        console.log('Géneros:', generosResponse.data); // Imprime la respuesta
        console.log('Clubes:', clubesResponse.data); // Imprime la respuesta
        console.log('Entrenadores:', entrenadoresResponse.data); // Imprime la respuesta

        // Asignar los datos a las listas correspondientes
        if (Array.isArray(provinciasResponse.data)) {
          setListaProvincias(provinciasResponse.data);
        }
        if (Array.isArray(categoriasResponse.data)) {
          setListaCategorias(categoriasResponse.data);
        }
        if (Array.isArray(generosResponse.data)) {
          setListaGeneros(generosResponse.data);
        }
        if (Array.isArray(clubesResponse.data)) {
          setListaClubes(clubesResponse.data);
        }
        if (Array.isArray(entrenadoresResponse.data)) {
          setListaEntrenadores(entrenadoresResponse.data);
        }
      } catch (error) {
        console.error('Error al cargar las listas:', error);
        Alert.alert('Error', 'No se pudieron cargar las opciones');
      }
    };

    fetchData();
  }, []);

  const handleCrear = async () => {
    try {
      const deportista = {
        NombresDep: nombresDep,
        ApellidosDep: apellidosDep,
        CedulaDep: cedulaDep,
        IdPro: idPro,
        IdCat: idCat,
        IdGen: idGen,
        IdClub: idClub,
        IdEnt: idEnt,
        ActivoDep: activoDep,
      };
  
      console.log('Datos del deportista a crear:', deportista); // Imprime los datos del deportista
  
      const response = await api.post('/api/Deportista', deportista);
      Alert.alert('Éxito', 'Deportista creado con éxito');
      navigation.goBack(); // Regresar a la pantalla anterior
    } catch (err) {
      console.error('Error al crear deportista:', err.response ? err.response.data : err.message);
      Alert.alert('Error', 'No se pudo crear el deportista');
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>CREAR DEPORTISTA</Text>
      <View style={styles.formContainer}>
        
        <Text style={styles.label}>Cédula</Text>
        <TextInput
          style={styles.input}
          value={cedulaDep}
          onChangeText={(text) => setCedulaDep(text)}
          placeholder="Ingrese la cédula"
        />
        
        <Text style={styles.label}>Nombres</Text>
        <TextInput
          style={styles.input}
          value={nombresDep}
          onChangeText={(text) => setNombresDep(text)}
          placeholder="Ingrese los nombres"
        />
        
        <Text style={styles.label}>Apellidos</Text>
        <TextInput
          style={styles.input}
          value={apellidosDep}
          onChangeText={(text) => setApellidosDep(text)}
          placeholder="Ingrese los apellidos"
        />
        
        <Text style={styles.label}>Provincia</Text>
        <Picker
          selectedValue={idPro}
          style={styles.select}
          onValueChange={(itemValue) => setIdPro(itemValue)}
        >
          <Picker.Item label="--Elija una Provincia--" value="" />
          {listaProvincias.map((provincia) => (
            <Picker.Item label={provincia.nombrePro} value={provincia.idPro} key={provincia.idPro} />
          ))}
        </Picker>

        <Text style={styles.label}>Categoría</Text>
        <Picker
          selectedValue={idCat}
          style={styles.select}
          onValueChange={(itemValue) => setIdCat(itemValue)}
        >
          <Picker.Item label="--Elija una Categoría--" value="" />
          {listaCategorias.map((categoria) => (
            <Picker.Item label={categoria.nombreCat} value={categoria.idCat} key={categoria.idCat} />
          ))}
        </Picker>

        <Text style={styles.label}>Género</Text>
        <Picker
          selectedValue={idGen}
          style={styles.select}
          onValueChange={(itemValue) => setIdGen(itemValue)}
        >
          <Picker.Item label="--Elija un Género--" value="" />
          {listaGeneros.map((genero) => (
            <Picker.Item label={genero.nombreGen} value={genero.idGen} key={genero.idGen} />
          ))}
        </Picker>

        <Text style={styles.label}>Club</Text>
        <Picker
          selectedValue={idClub}
          style={styles.select}
          onValueChange={(itemValue) => setIdClub(itemValue)}
        >
          <Picker.Item label="--Elija un Club--" value="" />
          {listaClubes.map((club) => (
            <Picker.Item label={club.nombreClub} value={club.idClub} key={club.idClub} />
          ))}
        </Picker>

        <Text style={styles.label}>Entrenador</Text>
        <Picker
          selectedValue={idEnt}
          style={styles.select}
          onValueChange={(itemValue) => setIdEnt(itemValue)}
        >
          <Picker.Item label="--Elija un Entrenador--" value="" />
          {listaEntrenadores.map((entrenador) => (
            <Picker.Item label={`${entrenador.nombresEnt} ${entrenador.apellidosEnt}`} value={entrenador.idEnt} key={entrenador.idEnt} />
          ))}
         </Picker>

         {/* Botones para Crear y Regresar */}
         <View style={styles.botonesContainer}>
           <TouchableOpacity style={[styles.botonCrear]} onPress={handleCrear}>
             <Text style={[styles.textoBotonCrear]}>Crear Deportista</Text>
           </TouchableOpacity>
           
           <TouchableOpacity 
               style={[styles.botonRegresar]} 
               onPress={() => navigation.goBack()}>
               <Text style={[styles.textoBotonRegresar]}>Regresar</Text>
           </TouchableOpacity>
         </View>
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
   formContainer: {
     marginBottom: 20,
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
     paddingVertical: 10,
     borderWidth: 1,
     borderColor: '#ccc',
     borderRadius: 5,
   },
   botonesContainer:{
       flexDirection:'row',
       justifyContent:'space-between',
       marginTop :10 ,
   },
   botonCrear:{
       backgroundColor:'#007bff',
       paddingVertical :10 ,
       paddingHorizontal :15 ,
       borderRadius :5 ,
       alignItems:'center',
       flexGrow :1 ,
   },
   textoBotonCrear:{
       color:'#fff' ,
       fontWeight:'bold' ,
       textAlign:'center' ,
   },
   botonRegresar:{
       backgroundColor:'#dc3545',
       paddingVertical :10 ,
       paddingHorizontal :15 ,
       borderRadius :5 ,
       alignItems:'center',
       flexGrow :1 ,
   },
   textoBotonRegresar:{
       color:'#fff' ,
       fontWeight:'bold' ,
       textAlign:'center' ,
   },
});

export default CreateDeportista;



