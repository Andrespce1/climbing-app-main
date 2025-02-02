import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importa Picker desde el nuevo paquete
import api from '../../services/api'; // Asegúrate de importar tu instancia de API
import { useNavigation, useRoute } from '@react-navigation/native'; // Importa useNavigation y useRoute

const EditEntrenador = () => {
  const navigation = useNavigation(); // Inicializa la navegación
  const route = useRoute(); // Obtiene los parámetros de la ruta
  const entrenador = route.params.entrenador; // Obtener el objeto entrenador pasado como parámetro

  // Inicializa el estado con los datos del entrenador
  const [nombresEnt, setNombresEnt] = useState(entrenador.NombresEnt);
  const [apellidosEnt, setApellidosEnt] = useState(entrenador.ApellidosEnt);
  const [cedulaEnt, setCedulaEnt] = useState(entrenador.CedulaEnt);
  const [idPro, setIdPro] = useState(entrenador.IdPro);
  const [idUsu, setIdUsu] = useState(entrenador.IdUsu);
  const [listaProvincias, setListaProvincias] = useState([]);

  useEffect(() => {
    loadOptions();
  }, []);

  const loadOptions = async () => {
    try {
      // Cargar provincias
      const provinciasResponse = await api.get('/api/Provincia');
      console.log('Datos de provincias:', provinciasResponse.data);
      setListaProvincias(provinciasResponse.data);
      
    } catch (error) {
      console.error('Error cargando opciones:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'No se pudieron cargar las opciones');
    }
  };

  const guardarEntrenador = async () => {
    try {
      const response = await api.put(`/api/Entrenador/${entrenador.id}`, { // Asegúrate de usar el ID correcto
        NombresEnt: nombresEnt,
        ApellidosEnt: apellidosEnt,
        CedulaEnt: cedulaEnt,
        IdPro: idPro,
        IdUsu: idUsu,
        ActivoEnt: entrenador.ActivoEnt, // Mantener el estado actual
      });
      console.log('Entrenador actualizado:', response.data);
      Alert.alert('Éxito', 'Entrenador actualizado con éxito');
      navigation.navigate('Index'); // Regresar a la lista de entrenadores
    } catch (error) {
      console.error('Error guardando entrenador:', error);
      Alert.alert('Error', 'No se pudo actualizar el entrenador');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>EDITAR ENTRENADOR</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nombres:</Text>
        <TextInput
          style={styles.input}
          value={nombresEnt}
          onChangeText={setNombresEnt}
          placeholder="Ingrese los nombres del entrenador"
        />
        <Text style={styles.label}>Apellidos:</Text>
        <TextInput
          style={styles.input}
          value={apellidosEnt}
          onChangeText={setApellidosEnt}
          placeholder="Ingrese los apellidos del entrenador"
        />
        <Text style={styles.label}>Cédula:</Text>
        <TextInput
          style={styles.input}
          value={cedulaEnt}
          onChangeText={setCedulaEnt}
          placeholder="Ingrese la cédula del entrenador"
          keyboardType="numeric"
        />
        <Text style={styles.label}>Provincia:</Text>
        <Picker
          selectedValue={idPro}
          style={styles.picker}
          onValueChange={(itemValue) => setIdPro(itemValue)}
        >
          <Picker.Item label="--Elija la Provincia--" value="" />
          {listaProvincias.map((provincia) => (
            <Picker.Item label={provincia.nombrePro} value={provincia.idPro} key={provincia.idPro} />
          ))}
        </Picker>

        {/* Botones para guardar y regresar */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={guardarEntrenador} style={[styles.button, styles.saveButton]}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.navigate('Index')} 
            style={[styles.button, styles.cancelButton]}>
            <Text style={styles.buttonText}>Regresar</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    marginBottom: 20,
   },
   label: {
       fontSize: 16,
       fontWeight: 'bold',
       marginBottom: 10,
   },
   input:{
       height :40 ,
       borderColor :'gray' ,
       borderWidth :1 ,
       paddingHorizontal :10 ,
       marginBottom :20 ,
   },
   picker:{
       width :'100%' ,
       marginBottom :20 ,
   },
   buttonContainer:{
       flexDirection:'row',
       justifyContent:'space-between',
       marginTop :10 ,
   },
   button:{
       paddingVertical :10 ,
       paddingHorizontal :15 ,
       borderRadius :5 ,
       elevation :2 ,
       width:'45%',
   },
   saveButton:{
       backgroundColor:'#007bff' ,
   },
   cancelButton:{
       backgroundColor:'#dc3545' ,
   },
   buttonText:{
       color:'#fff' ,
       textAlign:'center' ,
       fontWeight:'bold' ,
   }
});

export default EditEntrenador;

