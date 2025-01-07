import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { ConfirmDialog } from 'react-native-simple-confirm-dialog';

const Delete = ({ navigation, route }) => {
  const entrenador = route.params.entrenador;
  const [showDialog, setShowDialog] = useState(false);

  const deshabilitarEntrenador = () => {
    // Aquí debes implementar la lógica para deshabilitar al entrenador en el servidor
    // Puedes utilizar fetch o Axios para enviar los datos al servidor
    console.log('Deshabilitar entrenador:', entrenador);
    setShowDialog(true);
  };

  const handleConfirm = (confirmed) => {
    if (confirmed) {
      // Aquí puedes agregar la lógica para mostrar un mensaje de éxito
      Alert.alert('Deshabilitado!', 'El entrenador ha sido deshabilitado con éxito.');
      navigation.navigate('Index');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>DESHABILITAR ENTRENADOR</Text>
      <Text style={styles.question}>¿Estás seguro de deshabilitar a este entrenador?</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nombres:</Text>
        <Text style={styles.value}>{entrenador.NombresEnt}</Text>
        <Text style={styles.label}>Apellidos:</Text>
        <Text style={styles.value}>{entrenador.ApellidosEnt}</Text>
        <Text style={styles.label}>Cédula:</Text>
        <Text style={styles.value}>{entrenador.CedulaEnt}</Text>
        <Text style={styles.label}>Provincia:</Text>
        <Text style={styles.value}>{entrenador.IdProNavigation.NombrePro}</Text>
        <Text style={styles.label}>Usuario:</Text>
        <Text style={styles.value}>{entrenador.IdUsuNavigation.NombreUsu}</Text>
        <Text style={styles.label}>Estado:</Text>
        <Text style={styles.value}>{entrenador.ActivoEnt}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={deshabilitarEntrenador}>
          Deshabilitar
        </Button>
        <Button mode="outlined" onPress={() => navigation.navigate('Index')}>
          Regresar
        </Button>
      </View>
      <ConfirmDialog
        title="¿Está seguro de Deshabilitarlo?"
        message="No se podrá revertir!"
        visible={showDialog}
        onTouchOutside={() => setShowDialog(false)}
        positiveText="Deshabilitar"
        onPositivePress={() => handleConfirm(true)}
        negativeText="Cancelar"
        onNegativePress={() => handleConfirm(false)}
      />
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
  question: {
    fontSize: 18,
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default Delete;