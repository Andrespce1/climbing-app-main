import React, { useState } from 'react';
import { View, Text, StyleSheet, Picker, TextInput, TouchableOpacity } from 'react-native';

const Edit = ({ puntajeBloque, navigation, idComOptions, idDepOptions, onSubmit }) => {
  const [idCom, setIdCom] = useState(puntajeBloque.IdCom);
  const [idDep, setIdDep] = useState(puntajeBloque.IdDep);
  const [numeroBloque, setNumeroBloque] = useState(puntajeBloque.NumeroBloque);
  const [intentosTops, setIntentosTops] = useState(puntajeBloque.IntentosTops);
  const [intentosZonas, setIntentosZonas] = useState(puntajeBloque.IntentosZonas);
  const [etapa, setEtapa] = useState(puntajeBloque.Etapa);

  const handleSubmit = () => {
    const puntajeBloqueActualizado = {
      IdBloPts: puntajeBloque.IdBloPts,
      IdCom: idCom,
      IdDep: idDep,
      NumeroBloque: numeroBloque,
      IntentosTops: intentosTops,
      IntentosZonas: intentosZonas,
      Etapa: etapa,
    };
    onSubmit(puntajeBloqueActualizado);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Puntaje de Bloque</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Comunidad:</Text>
        <Picker
          selectedValue={idCom}
          onValueChange={(itemValue) => setIdCom(itemValue)}
        >
          <Picker.Item label="-- Seleccione una comunidad --" value="" />
          {idComOptions.map((option) => (
            <Picker.Item key={option.value} label={option.label} value={option.value} />
          ))}
        </Picker>
        <Text style={styles.label}>Deporte:</Text>
        <Picker
          selectedValue={idDep}
          onValueChange={(itemValue) => setIdDep(itemValue)}
        >
          <Picker.Item label="-- Seleccione un deporte --" value="" />
          {idDepOptions.map((option) => (
            <Picker.Item key={option.value} label={option.label} value={option.value} />
          ))}
        </Picker>
        <Text style={styles.label}>Número de Bloque:</Text>
        <TextInput
          style={styles.input}
          value={numeroBloque}
          onChangeText={(text) => setNumeroBloque(text)}
        />
        <Text style={styles.label}>Intentos Tops:</Text>
        <TextInput
          style={styles.input}
          value={intentosTops}
          onChangeText={(text) => setIntentosTops(text)}
        />
        <Text style={styles.label}>Intentos Zonas:</Text>
        <TextInput
          style={styles.input}
          value={intentosZonas}
          onChangeText={(text) => setIntentosZonas(text)}
        />
        <Text style={styles.label}>Etapa:</Text>
        <TextInput
          style={styles.input}
          value={etapa}
          onChangeText={(text) => setEtapa(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Volver a la lista</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Edit;