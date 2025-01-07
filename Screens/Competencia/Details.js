import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Details = ({ route, navigation }) => {
  const { competencia } = route.params; // Asumiendo que pasas el modelo como parámetro de navegación
  const listadoCategorias = []; // Asumir que estos datos se obtienen desde una API o fuente de datos
  const listadoGeneros = [];
  const listadoJueces = [];
  const listadoModalidades = [];
  const listadoSedes = [];
  const detalleCompetencia = competencia.Details; // Asumiendo que este es un arreglo dentro del modelo

  const getCategoriaNombre = (idCat) => {
    const categoria = listadoCategorias.find((categoria) => categoria.IdCat === idCat);
    return categoria ? categoria.NombreCat : 'No encontrado';
  };

  const getGeneroNombre = (idGen) => {
    const genero = listadoGeneros.find((genero) => genero.IdGen === idGen);
    return genero ? genero.NombreGen : 'No encontrado';
  };

  const getJuezNombre = (idJuez) => {
    const juez = listadoJueces.find((juez) => juez.IdJuez === idJuez);
    return juez ? `${juez.NombresJuez} ${juez.ApellidosJuez}` : 'No encontrado';
  };

  const getModalidadNombre = (idMod) => {
    const modalidad = listadoModalidades.find((modalidad) => modalidad.IdMod === idMod);
    return modalidad ? modalidad.DescripcionMod : 'No encontrado';
  };

  const getSedeNombre = (idSede) => {
    const sede = listadoSedes.find((sede) => sede.IdSede === idSede);
    return sede ? sede.NombreSede : 'No encontrado';
  };

  const getEstado = (activo) => (activo ? 'ACTIVO' : 'INACTIVO');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>DETALLES</Text>
      <View style={styles.detalleContainer}>
        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.valor}>{competencia.NombreCom}</Text>

        <Text style={styles.label}>Fecha de Inicio</Text>
        <Text style={styles.valor}>{competencia.FechaInicioCom}</Text>

        <Text style={styles.label}>Fecha de Fin</Text>
        <Text style={styles.valor}>{competencia.FechaFinCom}</Text>

        <Text style={styles.label}>Categoría</Text>
        <Text style={styles.valor}>{getCategoriaNombre(competencia.IdCat)}</Text>

        <Text style={styles.label}>Género</Text>
        <Text style={styles.valor}>{getGeneroNombre(competencia.IdGen)}</Text>

        <Text style={styles.label}>Juez</Text>
        <Text style={styles.valor}>{getJuezNombre(competencia.IdJuez)}</Text>

        <Text style={styles.label}>Modalidad</Text>
        <Text style={styles.valor}>{getModalidadNombre(competencia.IdMod)}</Text>

        <Text style={styles.label}>Sede</Text>
        <Text style={styles.valor}>{getSedeNombre(competencia.IdSede)}</Text>

        <Text style={styles.label}>Estado</Text>
        <Text style={styles.valor}>{getEstado(competencia.ActivoCom)}</Text>
      </View>

      <Text style={styles.subtitulo}>Detalle de Competencia</Text>
      <View style={styles.tablaContainer}>
        <View style={styles.tablaHeader}>
          <Text style={styles.tablaHeaderItem}>Puesto</Text>
          <Text style={styles.tablaHeaderItem}>Resultado de Clasificación</Text>
          <Text style={styles.tablaHeaderItem}>Resultado Final</Text>
          <Text style={styles.tablaHeaderItem}>Competencia</Text>
          <Text style={styles.tablaHeaderItem}>Deportista</Text>
        </View>
        {detalleCompetencia.map((item, index) => (
          <View key={index} style={styles.tablaRow}>
            <Text style={styles.tablaItem}>{item.Puesto}</Text>
            <Text style={styles.tablaItem}>{item.ClasRes}</Text>
            <Text style={styles.tablaItem}>{item.FinalRes}</Text>
            <Text style={styles.tablaItem}>{competencia.NombreCom}</Text>
            <Text style={styles.tablaItem}>
              {item.IdDepNavigation.NombresDep} {item.IdDepNavigation.ApellidosDep}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.botonesContainer}>
        <TouchableOpacity style={styles.botonEditar} onPress={() => navigation.navigate('EditarCompetencia', { id: competencia.IdCom })}>
          <Text style={styles.textoBoton}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonRegresar} onPress={() => navigation.goBack()}>
          <Text style={styles.textoBoton}>Regresar</Text>
        </TouchableOpacity>
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
  detalleContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  valor: {
    fontSize: 16,
    marginBottom: 15,
  },
  tablaContainer: {
    marginBottom: 20,
  },
  tablaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  tablaHeaderItem: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tablaRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    padding: 10,
    borderRadius: 5,
  },
  botonRegresar: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
  },
  textoBoton: {
    fontSize: 16,
    color: '#fff',
  },
});

export default Details;