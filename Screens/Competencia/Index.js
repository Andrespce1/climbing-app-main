import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Index = () => {
  const [competencias, setCompetencias] = useState([]);
  const [searchFor, setSearchFor] = useState('');
  const navigation = useNavigation();

  const listaCategorias = []; // Asumir que estos datos se obtienen desde una API o fuente de datos
  const listaGeneros = [];
  const listaJueces = [];
  const listaModalidades = [];
  const listaSedes = [];

  const getCategoriaNombre = (idCat) => {
    const categoria = listaCategorias.find((categoria) => categoria.IdCat === idCat);
    return categoria ? categoria.NombreCat : 'No encontrado';
  };

  const getGeneroNombre = (idGen) => {
    const genero = listaGeneros.find((genero) => genero.IdGen === idGen);
    return genero ? genero.NombreGen : 'No encontrado';
  };

  const getJuezNombre = (idJuez) => {
    const juez = listaJueces.find((juez) => juez.IdJuez === idJuez);
    return juez ? `${juez.NombresJuez} ${juez.ApellidosJuez}` : 'No encontrado';
  };

  const getModalidadNombre = (idMod) => {
    const modalidad = listaModalidades.find((modalidad) => modalidad.IdMod === idMod);
    return modalidad ? modalidad.DescripcionMod : 'No encontrado';
  };

  const getSedeNombre = (idSede) => {
    const sede = listaSedes.find((sede) => sede.IdSede === idSede);
    return sede ? sede.NombreSede : 'No encontrado';
  };

  const getEstado = (activo) => (activo ? 'ACTIVO' : 'INACTIVO');

  const handleBuscar = () => {
    // Lógica para buscar competencias (API call, etc.)
    console.log('Buscar Pressed');
  };

  const handleEditar = (idCom) => {
    navigation.navigate('EditarCompetencia', { id: idCom });
  };

  const handleDetalles = (idCom) => {
    navigation.navigate('DetallesCompetencia', { id: idCom });
  };

  const handleDeshabilitar = (idCom) => {
    // Lógica para deshabilitar la competencia (API call, etc.)
    console.log('Deshabilitar Pressed');
  };

  useEffect(() => {
    // Lógica para obtener el listado de competencias (API call, etc.)
    setCompetencias([
      // Ejemplo de datos
      { IdCom: 1, NombreCom: 'Competencia 1', FechaInicioCom: '2023-01-01', FechaFinCom: '2023-01-31', IdCat: 1, IdGen: 1, IdJuez: 1, IdMod: 1, IdSede: 1, ActivoCom: true },
      { IdCom: 2, NombreCom: 'Competencia 2', FechaInicioCom: '2023-02-01', FechaFinCom: '2023-02-28', IdCat: 2, IdGen: 2, IdJuez: 2, IdMod: 2, IdSede: 2, ActivoCom: false },
    ]);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>LISTADO DE COMPETENCIAS</Text>
      <View style={styles.buscarContainer}>
        <TextInput style={styles.inputBuscar} value={searchFor} onChangeText={(text) => setSearchFor(text)} placeholder="Buscar ..." />
        <TouchableOpacity style={styles.botonBuscar} onPress={handleBuscar}>
          <Text style={styles.textoBotonBuscar}>Buscar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tablaContainer}>
        <View style={styles.tablaHeader}>
          <Text style={styles.tablaHeaderItem}>Nombre</Text>
          <Text style={styles.tablaHeaderItem}>Fecha de Inicio</Text>
          <Text style={styles.tablaHeaderItem}>Fecha de Finalización</Text>
          <Text style={styles.tablaHeaderItem}>Categoría</Text>
          <Text style={styles.tablaHeaderItem}>Género</Text>
          <Text style={styles.tablaHeaderItem}>Juez</Text>
          <Text style={styles.tablaHeaderItem}>Modalidad</Text>
          <Text style={styles.tablaHeaderItem}>Sede</Text>
          <Text style={styles.tablaHeaderItem}>Estado</Text>
          <Text style={styles.tablaHeaderItem} />
        </View>
        {competencias.map((competencia, index) => (
          <View key={index} style={styles.tablaRow}>
            <Text style={styles.tablaItem}>{competencia.NombreCom}</Text>
            <Text style={styles.tablaItem}>{competencia.FechaInicioCom}</Text>
            <Text style={styles.tablaItem}>{competencia.FechaFinCom}</Text>
            <Text style={styles.tablaItem}>{getCategoriaNombre(competencia.IdCat)}</Text>
            <Text style={styles.tablaItem}>{getGeneroNombre(competencia.IdGen)}</Text>
            <Text style={styles.tablaItem}>{getJuezNombre(competencia.IdJuez)}</Text>
            <Text style={styles.tablaItem}>{getModalidadNombre(competencia.IdMod)}</Text>
            <Text style={styles.tablaItem}>{getSedeNombre(competencia.IdSede)}</Text>
            <Text style={styles.tablaItem}>{getEstado(competencia.ActivoCom)}</Text>
            <View style={styles.botonesContainer}>
              <TouchableOpacity style={styles.botonEditar} onPress={() => handleEditar(competencia.IdCom)}>
                <Text style={styles.textoBotonEditar}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botonDetalles} onPress={() => handleDetalles(competencia.IdCom)}>
                <Text style={styles.textoBotonDetalles}>Detalles</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botonDeshabilitar} onPress={() => handleDeshabilitar(competencia.IdCom)}>
                <Text style={styles.textoBotonDeshabilitar}>Deshabilitar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
  buscarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inputBuscar: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '80%',
  },
  botonBuscar: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  textoBotonBuscar: {
    fontSize: 16,
    color: '#fff',
  },
  tablaContainer: {
    marginBottom: 20,
  },
  tablaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  tablaHeaderItem: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tablaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tablaItem: {
    fontSize: 16,
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botonEditar: {
    backgroundColor: '#ffc107',
    padding: 5,
    borderRadius: 5,
  },
  textoBotonEditar: {
    fontSize: 14,
    color: '#fff',
  },
  botonDetalles: {
    backgroundColor: '#17a2b8',
    padding: 5,
    borderRadius: 5,
  },
  textoBotonDetalles: {
    fontSize: 14,
    color: '#fff',
  },
  botonDeshabilitar: {
    backgroundColor: '#dc3545',
    padding: 5,
    borderRadius: 5,
  },
  textoBotonDeshabilitar: {
    fontSize: 14,
    color: '#fff',
  },
});

export default Index;