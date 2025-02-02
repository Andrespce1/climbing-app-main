import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import api from '../../services/api';

const Edit = () => {
  const route = useRoute();
  const { juez } = route.params;
  const navigation = useNavigation();

  // Validar que el objeto juez y su id estén definidos
  if (!juez || juez.id === undefined) {
    Alert.alert('Error', 'No se ha proporcionado un juez válido.');
    navigation.goBack();
    return null;
  }

  // Inicializar estados
  const [nombresJuez, setNombresJuez] = useState(juez.nombresJuez || "");
  const [apellidosJuez, setApellidosJuez] = useState(juez.apellidosJuez || "");
  const [cedulaJuez, setCedulaJuez] = useState(juez.cedulaJuez || "");
  const [principalJuez, setPrincipalJuez] = useState(juez.principalJuez || false);
  const [idPro, setIdPro] = useState(juez.idPro || "");
  const [idUsu, setIdUsu] = useState(juez.idUsu || "");
  const [activoJuez, setActivoJuez] = useState(juez.activoJuez || true);

  const [listaEstados, setListaEstados] = useState([]);
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

      // Cargar estados
      const estados = [
        { label: 'Sí', value: true },
        { label: 'No', value: false },
      ];
      setListaEstados(estados);
    } catch (error) {
      console.error('Error cargando opciones:', error.response ? error.response.data : error.message);
    }
  };

  const handleGuardar = async () => {
    try {
      // Crear objeto con los datos a enviar
      const datosJuez = {
        idJuez: juez.idJuez, // Usa el campo correcto (idJuez en lugar de id)
        nombresJuez: nombresJuez,
        apellidosJuez: apellidosJuez,
        cedulaJuez: cedulaJuez,
        principalJuez: principalJuez,
        idPro: idPro,
        idUsu: idUsu,
        activoJuez: activoJuez,
      };
  
      console.log('Datos del juez a guardar:', datosJuez); // Imprimir para verificar
  
      // Enviar la solicitud PUT
      const response = await api.put(`/api/Juez/${juez.idJuez}`, datosJuez);
      console.log('Juez actualizado:', response.data);
      Alert.alert('Éxito', 'Los cambios se han guardado correctamente');
      navigation.goBack(); // Regresar a la pantalla anterior
    } catch (error) {
      console.error('Error al guardar el juez:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'No se pudo guardar el juez: ' + (error.response ? JSON.stringify(error.response.data) : 'Error desconocido'));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>EDITAR JUEZ</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombres"
          value={nombresJuez}
          onChangeText={setNombresJuez}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellidos"
          value={apellidosJuez}
          onChangeText={setApellidosJuez}
        />
        <TextInput
          style={styles.input}
          placeholder="Cédula"
          value={cedulaJuez}
          onChangeText={setCedulaJuez}
        />

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

        {/* Selector de Estado */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>¿Es Juez Principal?</Text>
          <Picker
            selectedValue={principalJuez ? 'true' : 'false'}
            style={styles.select}
            onValueChange={(itemValue) => setPrincipalJuez(itemValue === 'true')}
          >
            <Picker.Item label="Sí" value="true" />
            <Picker.Item label="No" value="false" />
          </Picker>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleGuardar}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
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
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formContainer: {
    marginBottom: 30,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '45%',
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Edit;