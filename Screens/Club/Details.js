import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';

const Details = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [club, setClub] = useState({});
  const [deportistas, setDeportistas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de carga de datos (reemplaza con tu lógica de API)
    const clubData = {
      id: 1,
      nombre: 'Club Ejemplo',
      deportistas: [
        {
          id: 1,
          nombres: 'Juan',
          apellidos: 'Pérez',
          cedula: '1234567890',
          categoria: 'Categoría A',
          club: 'Club Ejemplo',
          entrenador: 'Entrenador X',
          genero: 'Masculino',
          provincia: 'Provincia X',
          modalidades: ['Modalidad 1', 'Modalidad 2'],
          usuario: 'Usuario X',
        },
        // Agrega más deportistas según sea necesario
      ],
    };
    setClub(clubData);
    setDeportistas(clubData.deportistas);
    setLoading(false);
  }, []);

  const handleEditar = () => {
    // Navegar a la pantalla de edición
    navigation.navigate('EditarClub', { idClub: club.id });
  };

  const handleRegresar = () => {
    navigation.goBack(); // Regresar a la pantalla anterior
  };

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>DETALLES</Text>
      <View style={styles.clubInfoContainer}>
        <Text style={styles.clubInfoTitulo}>Club</Text>
        <View style={styles.hr} />
        <View style={styles.clubInfo}>
          <Text style={styles.label}>Nombre del Club</Text>
          <Text style={styles.value}>{club.nombre}</Text>
        </View>
      </View>
      <View style={styles.deportistasContainer}>
        <Text style={styles.deportistasTitulo}>DEPORTISTAS DEL CLUB</Text>
        <FlatList
          data={deportistas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.deportista}>
              <Text style={styles.label}>Nombres:</Text>
              <Text style={styles.value}>{item.nombres}</Text>
              <Text style={styles.label}>Apellidos:</Text>
              <Text style={styles.value}>{item.apellidos}</Text>
              <Text style={styles.label}>Cédula:</Text>
              <Text style={styles.value}>{item.cedula}</Text>
              <Text style={styles.label}>Categoría:</Text>
              <Text style={styles.value}>{item.categoria}</Text>
              <Text style={styles.label}>Club:</Text>
              <Text style={styles.value}>{item.club}</Text>
              <Text style={styles.label}>Entrenador:</Text>
              <Text style={styles.value}>{item.entrenador}</Text>
              <Text style={styles.label}>Género:</Text>
              <Text style={styles.value}>{item.genero}</Text>
              <Text style={styles.label}>Provincia:</Text>
              <Text style={styles.value}>{item.provincia}</Text>
              <Text style={styles.label}>Modalidades:</Text>
              {item.modalidades.map((modalidad, index) => (
                <Text key={index} style={styles.value}>
                  {modalidad}
                </Text>
              ))}
              <Text style={styles.label}>Usuario:</Text>
              <Text style={styles.value}>{item.usuario}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.botonesContainer}>
        <TouchableOpacity style={styles.botonEditar} onPress={handleEditar}>
          <Text style={styles.botonTexto}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonRegresar} onPress={handleRegresar}>
          <Text style={styles.botonTexto}>Regresar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  clubInfoContainer: {
    width: '100%',
    marginBottom: 20,
  },
  clubInfoTitulo: {
    fontSize: 18,
    marginBottom: 10,
  },
  hr: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  clubInfo: {
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  deportistasContainer: {
    width: '100%',
  },
  deportistasTitulo: {
    fontSize: 18,
    marginBottom: 10,
  },
  deportista: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  botonEditar: {
    backgroundColor: '#ffc107',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  botonRegresar: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Details;