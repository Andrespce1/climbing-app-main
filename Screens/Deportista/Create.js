import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios'; // Para realizar llamadas a la API
import Swal from 'sweetalert2'; // Para mostrar alertas

const Create = () => {
  const [cedulaDep, setCedulaDep] = useState('');
  const [nombresDep, setNombresDep] = useState('');
  const [apellidosDep, setApellidosDep] = useState('');
  const [idPro, setIdPro] = useState('');
  const [idCat, setIdCat] = useState('');
  const [idGen, setIdGen] = useState('');
  const [idClub, setIdClub] = useState('');
  const [idEnt, setIdEnt] = useState('');
  const [activoDep, setActivoDep] = useState('');
  const navigation = useNavigation();

  const listaProvincias = []; // Asumir que estos datos se obtienen desde una API o fuente de datos
  const listaCategorias = [];
  const listaGeneros = [];
  const listaClubes = [];
  const listaEntrenadores = [];
  const listaEstados = [];

  const handleCrear = async () => {
    // Verificar cédula antes de enviar el formulario
    const response = await axios.post('https://tu-api.com/VerificaIdentificacion', { identificacion: cedulaDep });
    if (response.data) {
      // Enviar formulario
      const deportista = {
        CedulaDep: cedulaDep,
        NombresDep: nombresDep,
        ApellidosDep: apellidosDep,
        IdPro: idPro,
        IdCat: idCat,
        IdGen: idGen,
        IdClub: idClub,
        IdEnt: idEnt,
        ActivoDep: activoDep,
      };
      // Lógica para crear el deportista (API call, etc.)
      console.log('Crear Deportista Pressed');
      navigation.goBack();
    } else {
      Swal.fire({
        title: 'Error',
        text: 'La cédula ingresada no es válida.',
        icon: 'error',
      });
    }
  };

  const handleVerificarCedula = async () => {
    const response = await axios.post('https://tu-api.com/VerificarCedula', { cedula: cedulaDep });
    if (response.data.exists) {
      Swal.fire({
        title: 'Warning',
        text: 'La cédula ingresada ya existe.',
        icon: 'warning',
      });
      // Deshabilitar botón de crear
      console.log('Cédula ya existe');
    } else {
      // Habilitar botón de crear
      console.log('Cédula disponible');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>CREAR</Text>
      <View style={styles.formContainer}>
        <Text style={styles.subtitulo}>Deportista</Text>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Cédula</Text>
          <TextInput
            style={styles.input}
            value={cedulaDep}
            onChangeText={(text) => setCedulaDep(text)}
            onBlur={handleVerificarCedula}
          />
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
          <Text style={styles.label}>Provincia</Text>
          <Picker
            selectedValue={idPro}
            style={styles.select}
            onValueChange={(itemValue) => setIdPro(itemValue)}
          >
            <Picker.Item label="--Elija una Provincia--" value="" />
            {listaProvincias.map((provincia) => (
              <Picker.Item label={provincia.NombrePro} value={provincia.IdPro} key={provincia.IdPro} />
            ))}
          </Picker>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Categoría</Text>
          <Picker
            selectedValue={idCat}
            style={styles.select}
            onValueChange={(itemValue) => setIdCat(itemValue)}
          >
            <Picker.Item label="--Elija una Categoría--" value="" />
            {listaCategorias.map((categoria) => (
              <Picker.Item label={categoria.NombreCat} value={categoria.IdCat} key={categoria.IdCat} />
            ))}
          </Picker>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Género</Text>
          <Picker
            selectedValue={idGen}
            style={styles.select}
            onValueChange={(itemValue) => setIdGen(itemValue)}
          >
            <Picker.Item label="--Elija un Género--" value="" />
            {listaGeneros.map((genero) => (
              <Picker.Item label={genero.NombreGen} value={genero.IdGen} key={genero.IdGen} />
            ))}
          </Picker>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Club</Text>
          <Picker
            selectedValue={idClub}
            style={styles.select}
            onValueChange={(itemValue) => setIdClub(itemValue)}
          >
            <Picker.Item label="--Elija un Club--" value="" />
            {listaClubes.map((club) => (
              <Picker.Item label={club.NombreClub} value={club.IdClub} key={club.IdClub} />
            ))}
          </Picker>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Entrenador</Text>
          <Picker
            selectedValue={idEnt}
            style={styles.select}
            onValueChange={(itemValue) => setIdEnt(itemValue)}
          >
            <Picker.Item label="--Elija un Entrenador--" value="" />
            {listaEntrenadores.map((entrenador) => (
              <Picker.Item label={entrenador.NombreEnt} value={entrenador.IdEnt} key={entrenador.IdEnt} />
            ))}
          </Picker>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Estado</Text>
          <Picker
            selectedValue={activoDep}
            style={styles.select}
            onValueChange={(itemValue) => setActivoDep(itemValue)}
          >
            <Picker.Item label="--Elija un Estado--" value="" />
            {listaEstados.map((estado) => (
              <Picker.Item label={estado.NombreEstado} value={estado.IdEstado} key={estado.IdEstado} />
            ))}
          </Picker>
        </View>
        <View style={styles.botonesContainer}>
          <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
            <Text style={styles.textoBotonCrear}>Crear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botonRegresar} onPress={() => navigation.goBack()}>
            <Text style={styles.textoBotonRegresar}>Regresar</Text>
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
  botonCrear: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  textoBotonCrear: {
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

export default Create;