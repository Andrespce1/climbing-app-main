import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Swal from 'react-native-swal'; // Debes instalar este paquete para usar Swal en React Native

const Delete = ({ juez, onDelete }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = () => {
    Swal.fire({
      title: '¿Está seguro de Deshabilitarlo?',
      text: "No se podrá revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Deshabilitar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setIsSubmitting(true);
        onDelete(juez.IdJuez)
          .then(() => {
            Swal.fire('Deshabilitado!', '', 'success');
          })
          .finally(() => {
            setIsSubmitting(false);
          });
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DESHABILITAR</Text>
      <Text style={styles.subtitle}>¿Estás seguro de deshabilitar a este Juez?</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nombres</Text>
        <Text style={styles.value}>{juez.NombresJuez}</Text>
        <Text style={styles.label}>Apellidos</Text>
        <Text style={styles.value}>{juez.ApellidosJuez}</Text>
        <Text style={styles.label}>Cédula</Text>
        <Text style={styles.value}>{juez.CedulaJuez}</Text>
        <Text style={styles.label}>¿Es Juez Principal?</Text>
        <Text style={styles.value}>{juez.PrincipalJuez ? 'Sí' : 'No'}</Text>
        <Text style={styles.label}>Provincia</Text>
        <Text style={styles.value}>{juez.IdProNavigation.NombrePro}</Text>
        <Text style={styles.label}>Usuario</Text>
        <Text style={styles.value}>{juez.IdUsuNavigation.NombreUsu}</Text>
        <Text style={styles.label}>Estado</Text>
        <Text style={styles.value}>{juez.ActivoJuez ? 'Activo' : 'Inactivo'}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>Deshabilitar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()} // Asumo que estás utilizando React Navigation
        >
          <Text style={styles.buttonText}>Regresar</Text>
        </TouchableOpacity>
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
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '45%',
    paddingVertical: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#3085d6',
  },
  cancelButton: {
    backgroundColor: '#d33',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Delete;