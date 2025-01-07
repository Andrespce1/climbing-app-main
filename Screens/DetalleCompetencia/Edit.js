import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Edit = ({ navigation, route }) => {
  const { detalleCompetencia } = route.params;
  const [clasRes, setClasRes] = useState(detalleCompetencia.ClasRes);
  const [idDep, setIdDep] = useState(detalleCompetencia.IdDep);
  const [idCom, setIdCom] = useState(detalleCompetencia.IdCom);

  const handleGuardar = () => {
    // Implementar lógica para guardar los cambios
    console.log('Guardar cambios:', { clasRes, idDep, idCom });
    navigation.goBack();
  };

  const handleRegresar = () => {
    // Navegar a la pantalla de competencias
    navigation.navigate('Competencia');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EDITAR</Text>
      <Text style={styles.subtitle}>Detalle de la Competencia</Text>
      <View style={styles.separator} />

      <View style={styles.formContainer}>
        <TextInput
          value={clasRes}
          onChangeText={setClasRes}
          placeholder="Resultado de Clasificación"
          style={styles.input}
        />
        <TextInput
          value={idDep.toString()}
          onChangeText={(text) => setIdDep(parseInt(text))}
          placeholder="Deportista"
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          value={idCom.toString()}
          onChangeText={(text) => setIdCom(parseInt(text))}
          placeholder="Competencia"
          style={styles.input}
          keyboardType="numeric"
        />
        <View style={styles.buttonContainer}>
          <Button title="Guardar" onPress={handleGuardar} color="#007bff" style={styles.button} />
          <Button title="Regresar" onPress={handleRegresar} color="#dc3545" style={styles.button} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
    width: '100%',
  },
  formContainer: {
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    width: '45%',
  },
});

export default Edit;