import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Resultados = () => {
  const [clasRes, setClasRes] = useState('');
  const [nuevoClasRes, setNuevoClasRes] = useState('');
  const [idDep, setIdDep] = useState('');
  const [idCom, setIdCom] = useState('');

  const handleGuardar = () => {
    // Implementar lógica para guardar los resultados
    console.log('Guardar resultados:', { clasRes, idDep, idCom });
  };

  const handleRegresar = () => {
    // Navegar a la pantalla de competencias
    console.log('Regresar a competencias');
  };

  const agregarClasRes = () => {
    // Comprobando si alguno de los valores contiene "fall" o "fs"
    const nuevoEsFall = nuevoClasRes.includes("fall");
    const actualEsFall = clasRes.includes("fall");
    const nuevoEsFs = nuevoClasRes.includes("fs");
    const actualEsFs = clasRes.includes("fs");

    // Manejo de todas las combinaciones posibles
    if ((nuevoEsFs && actualEsFall) || (actualEsFs && nuevoEsFall)) {
      // Si ambos contienen "fall" y "fs", tomar "fs"
      setClasRes("fs");
    } else if (nuevoEsFall && actualEsFs) {
      // Si uno contiene "fall" y el otro "fs", tomar "fs"
      setClasRes("fs");
    } else if (nuevoEsFall || actualEsFall) {
      // Si alguno contiene "fall" y el otro no, tomar el valor numérico si es que existe
      const nuevoNum = parseFloat(nuevoClasRes.replace("fall", ""));
      const actualNum = parseFloat(clasRes.replace("fall", ""));

      if (!isNaN(nuevoNum) && !isNaN(actualNum)) {
        setClasRes(Math.min(nuevoNum, actualNum).toString());
      } else if (!isNaN(nuevoNum)) {
        setClasRes(nuevoNum.toString());
      } else if (!isNaN(actualNum)) {
        setClasRes(actualNum.toString());
      }
    } else if (nuevoEsFs || actualEsFs) {
      // Si alguno contiene "fs" y el otro no, tomar "fs"
      setClasRes("fs");
    } else {
      // Si ninguno contiene "fall" ni "fs", comparar valores numéricos
      const nuevoNum = parseFloat(nuevoClasRes);
      const actualNum = parseFloat(clasRes);

      if (!isNaN(nuevoNum) && !isNaN(actualNum)) {
        setClasRes(Math.min(nuevoNum, actualNum).toString());
      } else if (!isNaN(nuevoNum)) {
        setClasRes(nuevoNum.toString());
      } else if (!isNaN(actualNum)) {
        setClasRes(actualNum.toString());
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Resultados</Text>
      <Text style={styles.subtitle}>Detalle de la Competencia</Text>
      <View style={styles.separator} />

      <View style={styles.formContainer}>
        <TextInput
          value={clasRes}
          onChangeText={setClasRes}
          placeholder="Resultado de Clasificación 1"
          style={styles.input}
        />
        <TextInput
          value={nuevoClasRes}
          onChangeText={setNuevoClasRes}
          placeholder="Resultado de Clasificación 2"
          style={styles.input}
          onBlur={agregarClasRes}
        />
        <TextInput
          value={idDep}
          onChangeText={setIdDep}
          placeholder="Deportista"
          style={styles.input}
        />
        <TextInput
          value={idCom}
          onChangeText={setIdCom}
          placeholder="Competencia"
          style={styles.input}
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

export default Resultados;