import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Edit = ({ route, navigation }) => {
  const { competencia } = route.params; // Asumiendo que pasas el modelo como parámetro de navegación
  const [nombreCom, setNombreCom] = useState(competencia.NombreCom);
  const [fechaInicioCom, setFechaInicioCom] = useState(competencia.FechaInicioCom);
  const [fechaFinCom, setFechaFinCom] = useState(competencia.FechaFinCom);
  const [idGen, setIdGen] = useState(competencia.IdGen);
  const [idJuez, setIdJuez] = useState(competencia.IdJuez);
  const [idCat, setIdCat] = useState(competencia.IdCat);
  const [idSede, setIdSede] = useState(competencia.IdSede);
  const [idMod, setIdMod] = useState(competencia.IdMod);
  const [activoCom, setActivoCom] = useState(competencia.ActivoCom);

  const listaGeneros = []; // Asumir que estos datos se obtienen desde una API o fuente de datos
  const listaJueces = [];
  const listaCategorias = [];
  const listaSedes = [];
  const listaModalidades = [];
  const listaEstados = [];

  const detalleCompetencia = competencia.DetalleCompetencia; // Asumiendo que este es un arreglo dentro del modelo

  const handleGuardar = () => {
    // Lógica para guardar los cambios (API call, etc.)
    console.log('Guardar Pressed');
    navigation.goBack();
  };

  const handleAgregarDeportista = (idCom, idMod) => {
    if (idMod === 3) {
      navigation.navigate('CrearDificultad', { idCom });
    } else if (idMod === 1) {
      navigation.navigate('CrearDetalleCompetencia', { idCom, returnTo: 'edit' });
    }
  };

  const handleEliminarDeportista = (idDetalle) => {
    // Lógica para eliminar el deportista (API call, etc.)
    console.log('Eliminar Deportista Pressed');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>EDITAR</Text>
      <View style={styles.formContainer}>
        <Text style={styles.subtitulo}>Competencia</Text>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput style={styles.input} value={nombreCom} onChangeText={(text) => setNombreCom(text)} />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Fecha Inicio</Text>
          <TextInput style={styles.input} value={fechaInicioCom} onChangeText={(text) => setFechaInicioCom(text)} />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Fecha de Finalización</Text>
          <TextInput style={styles.input} value={fechaFinCom} onChangeText={(text) => setFechaFinCom(text)} />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Género</Text>
          <Picker
            selectedValue={idGen}
            style={styles.select}
            onValueChange={(itemValue) => setIdGen(itemValue)}
          >
            <Picker.Item label="--Elija un Género--" value="" />
            {listaGeneros.map((genero) => (
              <Picker.Item label={genero.NombreGen} value={genero.IdGen} key={genero.IdGen} />
            ))}
          </Picker>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Juez</Text>
          <Picker
            selectedValue={idJuez}
            style={styles.select}
            onValueChange={(itemValue) => setIdJuez(itemValue)}
          >
            <Picker.Item label="--Elija un Juez--" value="" />
            {listaJueces.map((juez) => (
              <Picker.Item label={`${juez.NombresJuez} ${juez.ApellidosJuez}`} value={juez.IdJuez} key={juez.IdJuez} />
            ))}
          </Picker>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Categoría</Text>
          <Picker
            selectedValue={idCat}
            style={styles.select}
            onValueChange={(itemValue) => setIdCat(itemValue)}
          >
            <Picker.Item label="--Elija una Categoría--" value="" />
            {listaCategorias.map((categoria) => (
              <Picker.Item label={categoria.NombreCat} value={categoria.IdCat} key={categoria.IdCat} />
            ))}
          </Picker>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Sede</Text>
          <Picker
            selectedValue={idSede}
            style={styles.select}
            onValueChange={(itemValue) => setIdSede(itemValue)}
          >
            <Picker.Item label="--Elija una Sede--" value="" />
            {listaSedes.map((sede) => (
              <Picker.Item label={sede.NombreSede} value={sede.IdSede} key={sede.IdSede} />
            ))}
          </Picker>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Modalidad</Text>
          <Picker
            selectedValue={idMod}
            style={styles.select}
            onValueChange={(itemValue) => setIdMod(itemValue)}
          >
            <Picker.Item label="--Elija una Modalidad--" value="" />
            {listaModalidades.map((modalidad) => (
              <Picker.Item label={modalidad.DescripcionMod} value={modalidad.IdMod} key={modalidad.IdMod} />
            ))}
          </Picker>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Estado</Text>
          <Picker
            selectedValue={activoCom}
            style={styles.select}
            onValueChange={(itemValue) => setActivoCom(itemValue)}
          >
            <Picker.Item label="--Elija un Estado--" value="" />
            {listaEstados.map((estado) => (
              <Picker.Item label={estado.NombreEstado} value={estado.IdEstado} key={estado.IdEstado} />
            ))}
          </Picker>
        </View>
        <View style={styles.botonesContainer}>
          {activoCom && (
            <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardar}>
              <Text style={styles.textoBoton}>Guardar</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.botonRegresar} onPress={() => navigation.goBack()}>
            <Text style={styles.textoBoton}>Regresar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.subtitulo}>DETALLE</Text>
      {activoCom && (
        <View>
          {idMod === 3 && (
            <TouchableOpacity style={styles.botonAgregar} onPress={() => handleAgregarDeportista(competencia.IdCom, idMod)}>
              <Text style={styles.textoBoton}>Agregar Deportista</Text>
            </TouchableOpacity>
          )}
          {idMod === 1 && (
            <TouchableOpacity style={styles.botonAgregar} onPress={() => handleAgregarDeportista(competencia.IdCom, idMod)}>
              <Text style={styles.textoBoton}>Agregar Deportista</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <View style={styles.tablaContainer}>
        <View style={styles.tablaHeader}>
          <Text style={styles.tablaHeaderItem}>Deportista</Text>
          <Text style={styles.tablaHeaderItem} />
        </View>
        {detalleCompetencia.map((item, index) => (
          <View key={index} style={styles.tablaRow}>
            <Text style={styles.tablaItem}>
              {item.IdDepNavigation.NombresDep} {item.IdDepNavigation.ApellidosDep}
            </Text>
            {activoCom && (
              <TouchableOpacity style={styles.botonEliminar} onPress={() => handleEliminarDeportista(item.IdDetalle)}>
                <Text style={styles.textoBotonEliminar}>Eliminar</Text>
              </TouchableOpacity>
            )}
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
  subtitulo: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  formContainer: {
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  select: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botonGuardar: {
    backgroundColor: '#007bff',
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
  botonAgregar: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  textoBotonAgregar: {
    fontSize: 16,
    color: '#fff',
  },
  botonEliminar: {
    backgroundColor: '#dc3545',
    padding: 5,
    borderRadius: 5,
  },
  textoBotonEliminar: {
    fontSize: 14,
    color: '#fff',
  },
});

export default Edit;