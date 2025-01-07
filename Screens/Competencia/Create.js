import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Picker, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const Create = () => {
  const navigation = useNavigation();
  const [competencia, setCompetencia] = useState({
    nombre: '',
    fechaInicio: '',
    fechaFin: '',
    idGen: '',
    idJuez: '',
    idCat: '',
    idSede: '',
    idMod: '',
    activo: '',
  });
  const [generos, setGeneros] = useState([
    { id: 1, nombre: 'Masculino' },
    { id: 2, nombre: 'Femenino' },
  ]);
  const [jueces, setJueces] = useState([
    { id: 1, nombre: 'Juez 1' },
    { id: 2, nombre: 'Juez 2' },
  ]);
  const [categorias, setCategorias] = useState([
    { id: 1, nombre: 'Categoría A' },
    { id: 2, nombre: 'Categoría B' },
  ]);
  const [sedes, setSedes] = useState([
    { id: 1, nombre: 'Sede 1' },
    { id: 2, nombre: 'Sede 2' },
  ]);
  const [modalidades, setModalidades] = useState([
    { id: 1, nombre: 'Modalidad 1' },
    { id: 2, nombre: 'Modalidad 2' },
  ]);
  const [estados, setEstados] = useState([
    { id: 1, nombre: 'Activo' },
    { id: 2, nombre: 'Inactivo' },
  ]);

  const handleCrear = () => {
    // Lógica para crear la competencia (p. ej., API call)
    console.log('Crear competencia:', competencia);
    // Navegar a otra pantalla después de crear (opcional)
    // navigation.navigate('Competencias');
  };

  const handleRegresar = () => {
    navigation.goBack(); // Regresar a la pantalla anterior
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>CREAR</Text>
      <View style={styles.formContainer}>
        <Text style={styles.formTitulo}>Competencia</Text>
        <View style={styles.hr} />
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={competencia.nombre}
          onChangeText={(text) => setCompetencia({ ...competencia, nombre: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de Inicio"
          value={competencia.fechaInicio}
          onChangeText={(text) => setCompetencia({ ...competencia, fechaInicio: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de Fin"
          value={competencia.fechaFin}
          onChangeText={(text) => setCompetencia({ ...competencia, fechaFin: text })}
        />
        <Text style={styles.label}>Género:</Text>
        <Picker
          selectedValue={competencia.idGen}
          onValueChange={(itemValue) => setCompetencia({ ...competencia, idGen: itemValue })}
        >
          <Picker.Item label="--Elija un Género--" value="" />
          {generos.map((genero) => (
            <Picker.Item key={genero.id} label={genero.nombre} value={genero.id} />
          ))}
        </Picker>
        <Text style={styles.label}>Juez:</Text>
        <Picker
          selectedValue={competencia.idJuez}
          onValueChange={(itemValue) => setCompetencia({ ...competencia, idJuez: itemValue })}
        >
          <Picker.Item label="--Elija un Juez--" value="" />
          {jueces.map((juez) => (
            <Picker.Item key={juez.id} label={juez.nombre} value={juez.id} />
          ))}
        </Picker>
        <Text style={styles.label}>Categoría:</Text>
        <Picker
          selectedValue={competencia.idCat}
          onValueChange={(itemValue) => setCompetencia({ ...competencia, idCat: itemValue })}
        >
          <Picker.Item label="--Elija una Categoría--" value="" />
          {categorias.map((categoria) => (
            <Picker.Item key={categoria.id} label={categoria.nombre} value={categoria.id} />
          ))}
        </Picker>
        <Text style={styles.label}>Sede:</Text>
        <Picker
          selectedValue={competencia.idSede}
          onValueChange={(itemValue) => setCompetencia({ ...competencia, idSede: itemValue })}
        >
          <Picker.Item label="--Elija una Sede--" value="" />
          {sedes.map((sede) => (
            <Picker.Item key={sede.id} label={sede.nombre} value={sede.id} />
          ))}
        </Picker>
        <Text style={styles.label}>Modalidad:</Text>
        <Picker
          selectedValue={competencia.idMod}
          onValueChange={(itemValue) => setCompetencia({ ...competencia, idMod: itemValue })}
        >
          <Picker.Item label="--Elija una Modalidad--" value="" />
          {modalidades.map((modalidad) => (
            <Picker.Item key={modalidad.id} label={modalidad.nombre} value={modalidad.id} />
          ))}
        </Picker>
        <Text style={styles.label}>Estado:</Text>
        <Picker
          selectedValue={competencia.activo}
          onValueChange={(itemValue) => setCompetencia({ ...competencia, activo: itemValue })}
        >
          <Picker.Item label="--Elija un Estado--" value="" />
          {estados.map((estado) => (
            <Picker.Item key={estado.id} label={estado.nombre} value={estado.id} />
          ))}
        </Picker>
        <View style={styles.botonesContainer}>
          <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
            <Text style={styles.botonTexto}>Crear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botonRegresar} onPress={handleRegresar}>
            <Text style={styles.botonTexto}>Regresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formContainer: {
    width: '100%',
  },
  formTitulo: {
    fontSize: 18,
    marginBottom: 10,
  },
  hr: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  botonCrear: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  botonRegresar: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Create;