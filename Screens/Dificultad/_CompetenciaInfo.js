import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const _CompetenciaInfo = () => {
  const competencia = {
    NombreCom: 'Nombre de la Competencia',
    FechaInicioCom: 'Fecha de Inicio',
    FechaFinCom: 'Fecha de Fin',
    IdGen: 1,
    IdJuez: 'Nombre del Juez',
    IdCat: 1,
    IdSede: 'Nombre de la Sede',
    IdMod: 1,
    ActivoCom: true,
  };

  const generos = {
    1: 'Masculino',
    2: 'Femenino',
    3: 'Otro',
  };

  const categorias = {
    1: 'Infantil',
    2: 'Under16',
    3: 'Under18',
    4: 'Under20',
    5: 'Over20',
  };

  const modalidades = {
    1: 'Velocidad',
    2: 'Bloque',
    3: 'Dificultad',
  };

  const estados = {
    true: 'Activo',
    false: 'Inactivo',
  };

  const genero = generos[competencia.IdGen] || 'Desconocido';
  const categoria = categorias[competencia.IdCat] || 'Desconocido';
  const modalidad = modalidades[competencia.IdMod] || 'Desconocido';
  const estado = estados[competencia.ActivoCom] || 'Desconocido';

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          value={competencia.NombreCom}
          editable={false}
          style={styles.input}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Fecha Inicio</Text>
        <TextInput
          value={competencia.FechaInicioCom}
          editable={false}
          style={styles.input}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Fecha de Finalización</Text>
        <TextInput
          value={competencia.FechaFinCom}
          editable={false}
          style={styles.input}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Género</Text>
        <TextInput
          value={genero}
          editable={false}
          style={styles.input}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Juez</Text>
        <TextInput
          value={competencia.IdJuez}
          editable={false}
          style={styles.input}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Categoría</Text>
        <TextInput
          value={categoria}
          editable={false}
          style={styles.input}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Sede</Text>
        <TextInput
          value={competencia.IdSede}
          editable={false}
          style={styles.input}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Modalidad</Text>
        <TextInput
          value={modalidad}
          editable={false}
          style={styles.input}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Estado</Text>
        <TextInput
          value={estado}
          editable={false}
          style={styles.input}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default _CompetenciaInfo;