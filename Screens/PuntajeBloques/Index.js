import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const Index = ({ navigation }) => {
  const [puntajesBloque, setPuntajesBloque] = useState([]);

  useEffect(() => {
    // Lógica para obtener la lista de puntajes de bloque desde la API o base de datos
    const puntajesBloqueDummy = [
      { IdBloPts: 1, NumeroBloque: 'Bloque 1', IntentosTops: 10, IntentosZonas: 5, Etapa: 'Etapa 1', IdComNavigation: { IdCom: 'Comunidad 1' }, IdDepNavigation: { IdDep: 'Deporte 1' } },
      { IdBloPts: 2, NumeroBloque: 'Bloque 2', IntentosTops: 20, IntentosZonas: 10, Etapa: 'Etapa 2', IdComNavigation: { IdCom: 'Comunidad 2' }, IdDepNavigation: { IdDep: 'Deporte 2' } },
    ];
    setPuntajesBloque(puntajesBloqueDummy);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.label}>Número de Bloque:</Text>
      <Text style={styles.value}>{item.NumeroBloque}</Text>
      <Text style={styles.label}>Intentos Tops:</Text>
      <Text style={styles.value}>{item.IntentosTops}</Text>
      <Text style={styles.label}>Intentos Zonas:</Text>
      <Text style={styles.value}>{item.IntentosZonas}</Text>
      <Text style={styles.label}>Etapa:</Text>
      <Text style={styles.value}>{item.Etapa}</Text>
      <Text style={styles.label}>Comunidad:</Text>
      <Text style={styles.value}>{item.IdComNavigation.IdCom}</Text>
      <Text style={styles.label}>Deporte:</Text>
      <Text style={styles.value}>{item.IdDepNavigation.IdDep}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PuntajeBloqueEditar', { idBloPts: item.IdBloPts })}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PuntajeBloqueDetalles', { idBloPts: item.IdBloPts })}
        >
          <Text style={styles.buttonText}>Detalles</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PuntajeBloqueEliminar', { idBloPts: item.IdBloPts })}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Puntajes de Bloque</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PuntajeBloqueCrear')}
      >
        <Text style={styles.buttonText}>Crear Nuevo</Text>
      </TouchableOpacity>
      <FlatList
        data={puntajesBloque}
        renderItem={renderItem}
        keyExtractor={(item) => item.IdBloPts.toString()}
      />
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
  item: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
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
});

export default Index;