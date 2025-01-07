import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Picker, TouchableOpacity } from 'react-native';

const Edit = ({ juez, navigation, listaEstados, listaProvincias, listaUsuarios, listaEstados2, onSubmit }) => {
  const [nombresJuez, setNombresJuez] = useState(juez.NombresJuez);
  const [apellidosJuez, setApellidosJuez] = useState(juez.ApellidosJuez);
  const [cedulaJuez, setCedulaJuez] = useState(juez.CedulaJuez);
  const [principalJuez, setPrincipalJuez] = useState(juez.PrincipalJuez);
  const [idPro, setIdPro] = useState(juez.IdPro);
  const [idUsu, setIdUsu] = useState(juez.IdUsu);
  const [activoJuez, setActivoJuez] = useState(juez.ActivoJuez);

  const handleSubmit = () => {
    const juezActualizado = {
      IdJuez: juez.IdJuez,
      NombresJuez: nombresJuez,
      ApellidosJuez: apellidosJuez,
      CedulaJuez: cedulaJuez,
      PrincipalJuez: principalJuez,
      IdPro: idPro,
      IdUsu: idUsu,
      ActivoJuez: activoJuez,
    };
    onSubmit(juezActualizado);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EDITAR</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombres"
          value={nombresJuez}
          onChangeText={(text) => setNombresJuez(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellidos"
          value={apellidosJuez}
          onChangeText={(text) => setApellidosJuez(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Cédula"
          value={cedulaJuez}
          onChangeText={(text) => setCedulaJuez(text)}
        />
        <Text style={styles.label}>¿Es Juez Principal?</Text>
        <Picker
          selectedValue={principalJuez}
          onValueChange={(itemValue) => setPrincipalJuez(itemValue)}
        >
          <Picker.Item label="--Elija la opción--" value="" />
          {listaEstados.map((estado) => (
            <Picker.Item key={estado.value} label={estado.label} value={estado.value} />
          ))}
        </Picker>
        <Text style={styles.label}>Provincia</Text>
        <Picker
          selectedValue={idPro}
          onValueChange={(itemValue) => setIdPro(itemValue)}
        >
          <Picker.Item label="--Elija la Provincia--" value="" />
          {listaProvincias.map((provincia) => (
            <Picker.Item key={provincia.value} label={provincia.label} value={provincia.value} />
          ))}
        </Picker>
        <Text style={styles.label}>Usuario</Text>
        <Picker
          selectedValue={idUsu}
          onValueChange={(itemValue) => setIdUsu(itemValue)}
        >
          <Picker.Item label="--Elija un Usuario--" value="" />
          {listaUsuarios.map((usuario) => (
            <Picker.Item key={usuario.value} label={usuario.label} value={usuario.value} />
          ))}
        </Picker>
        <Text style={styles.label}>Estado</Text>
        <Picker
          selectedValue={activoJuez}
          onValueChange={(itemValue) => setActivoJuez(itemValue)}
        >
          <Picker.Item label="--Elija un Estado--" value="" />
          {listaEstados2.map((estado) => (
            <Picker.Item key={estado.value} label={estado.label} value={estado.value} />
          ))}
        </Picker>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Regresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
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