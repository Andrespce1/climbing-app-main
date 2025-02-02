import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importa Picker desde el nuevo paquete
import api from '../../services/api'; // Asegúrate de importar tu instancia de API
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation


const CreateEntrenador = () => {
  const [nombresEnt, setNombresEnt] = useState('');
  const [apellidosEnt, setApellidosEnt] = useState('');
  const [cedulaEnt, setCedulaEnt] = useState('');
  const [idPro, setIdPro] = useState('');
  const [listaProvincias, setListaProvincias] = useState([]);
  const [estadoEnt, setEstadoEnt] = useState(true); // Por defecto habilitado (true)
  const navigation = useNavigation(); // Inicializa la navegación

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

  const createEntrenador = async () => {
    if (!nombresEnt || !apellidosEnt || !cedulaEnt || !idPro) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }
  
    try {
      const response = await api.post('/api/Entrenador', {
        NombresEnt: nombresEnt,
        ApellidosEnt: apellidosEnt,
        CedulaEnt: cedulaEnt,
        IdPro: idPro,
        ActivoEnt: estadoEnt, // Se pasa como booleano
      });
      console.log('Entrenador creado:', response.data);
      Alert.alert('Éxito', 'Entrenador creado con éxito');
  
      // Limpiar el formulario después de crear
      setNombresEnt('');
      setApellidosEnt('');
      setCedulaEnt('');
      setIdPro('');
      setEstadoEnt(true); // Reiniciar a habilitado por defecto
  
      // Regresar a la pantalla anterior
      navigation.goBack(); // Asegúrate de tener acceso a la navegación
    } catch (error) {
      console.error('Error creando entrenador:', error);
      Alert.alert('Error', 'No se pudo crear el entrenador');
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>CREAR ENTRENADOR</Text>
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
          <Picker.Item label="--Elija una Provincia--" value="" />
          {listaProvincias.map((provincia) => (
            <Picker.Item label={provincia.nombrePro} value={provincia.idPro} key={provincia.idPro} />
          ))}
        </Picker>

        {/* Selección de Estado */}
        <Text style={styles.label}>Estado:</Text>
        <Picker
          selectedValue={estadoEnt ? '1' : '0'} // Mapeo del booleano a string para el Picker
          style={styles.picker}
          onValueChange={(itemValue) => setEstadoEnt(itemValue === '1')}
        >
          <Picker.Item label="Habilitado" value="1" />
          <Picker.Item label="Deshabilitado" value="0" />
        </Picker>

        {/* Botones para guardar y regresar */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={createEntrenador} style={[styles.button, styles.createButton]}>
            <Text style={styles.buttonText}>Crear</Text>
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
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  picker: {
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    elevation: 2,
    width: '45%',
  },
  createButton: {
    backgroundColor: '#007bff',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  }
});

export default CreateEntrenador;
