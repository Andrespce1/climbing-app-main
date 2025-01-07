import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Edit = ({ route }) => {
  const { deportista } = route.params; // Asumiendo que pasas el modelo como parámetro de navegación
  const [nombresDep, setNombresDep] = useState(deportista.NombresDep);
  const [apellidosDep, setApellidosDep] = useState(deportista.ApellidosDep);
  const [cedulaDep, setCedulaDep] = useState(deportista.CedulaDep);
  const [idPro, setIdPro] = useState(deportista.IdPro);
  const [idUsu, setIdUsu] = useState(deportista.IdUsu);
  const [idCat, setIdCat] = useState(deportista.IdCat);
  const [idGen, setIdGen] = useState(deportista.IdGen);
  const [idClub, setIdClub] = useState(deportista.IdClub);
  const [idEnt, setIdEnt] = useState(deportista.IdEnt);
  const [activoDep, setActivoDep] = useState(deportista.ActivoDep);
  const navigation = useNavigation();

  const listaProvincias = []; // Asumir que estos datos se obtienen desde una API o fuente de datos
  const listaUsuarios = [];
  const listaCategorias = [];
  const listaGeneros = [];
  const listaClubes = [];
  const listaEntrenadores = [];
  const listaEstados = [];

  const handleGuardar = () => {
    // Lógica para guardar los cambios (API call, etc.)
    console.log('Guardar Pressed');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>EDITAR</Text>
      <View style={styles.formContainer}>
        <Text style={styles.subtitulo}>Deportista</Text>
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
          <Text style={styles.label}>Provincia</Text>
          <Picker
            selectedValue={idPro}
            style={styles.select}
            onValueChange={(itemValue) => setIdPro(itemValue)}
          >
            <Picker.Item label="--Elija la Provincia--" value="" />
            {listaProvincias.map((provincia) => (
              <Picker.Item label={provincia.NombrePro} value={provincia.IdPro} key={provincia.IdPro} />
            ))}
          </Picker>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Usuario</Text>
          <Picker
            selectedValue={idUsu}
            style={styles.select}
            onValueChange={(itemValue) => setIdUsu(itemValue)}
          >
            <Picker.Item label="--Elija un Usuario--" value="" />
            {listaUsuarios.map((usuario) => (
              <Picker.Item label={usuario.NombreUsu} value={usuario.IdUsu} key={usuario.IdUsu} />
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
              <Picker.Item label={`${entrenador.NombresEnt} ${entrenador.ApellidosEnt}`} value={entrenador.IdEnt} key={entrenador.IdEnt} />
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
          <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardar}>
            <Text style={styles.textoBotonGuardar}>Guardar</Text>
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