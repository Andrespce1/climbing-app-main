import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Delete = ({ route }) => {
  const { deportista } = route.params; // Asumiendo que pasas el modelo como parámetro de navegación
  const navigation = useNavigation();

  const listaCategorias = []; // Asumir que estos datos se obtienen desde una API o fuente de datos
  const listaClubes = [];
  const listaEntrenadores = [];
  const listaGeneros = [];
  const listaProvincias = [];
  const listaUsuarios = [];

  const getCategoriaNombre = (idCat) => {
    const categoria = listaCategorias.find((categoria) => categoria.IdCat === idCat);
    return categoria ? categoria.NombreCat : 'No encontrado';
  };

  const getClubNombre = (idClub) => {
    const club = listaClubes.find((club) => club.IdClub === idClub);
    return club ? club.NombreClub : 'No encontrado';
  };

  const getEntrenadorNombre = (idEnt) => {
    const entrenador = listaEntrenadores.find((entrenador) => entrenador.IdEnt === idEnt);
    return entrenador ? `${entrenador.NombresEnt} ${entrenador.ApellidosEnt}` : 'No encontrado';
  };

  const getGeneroNombre = (idGen) => {
    const genero = listaGeneros.find((genero) => genero.IdGen === idGen);
    return genero ? genero.NombreGen : 'No encontrado';
  };

  const getProvinciaNombre = (idPro) => {
    const provincia = listaProvincias.find((provincia) => provincia.IdPro === idPro);
    return provincia ? provincia.NombrePro : 'No encontrado';
  };

  const getUsuarioNombre = (idUsu) => {
    const usuario = listaUsuarios.find((usuario) => usuario.IdUsu === idUsu);
    return usuario ? usuario.NombreUsu : 'No encontrado';
  };

  const getEstado = (activo) => (activo ? 'Activo' : 'Inactivo');

  const handleDeshabilitar = () => {
    Alert.alert(
      '¿Está seguro de Deshabilitarlo?',
      'No se podrá revertir!',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancelar Pressed'),
          style: 'cancel',
        },
        {
          text: 'Deshabilitar',
          onPress: () => {
            // Lógica para deshabilitar el deportista (API call, etc.)
            console.log('Deshabilitar Pressed');
            navigation.goBack();
            Alert.alert('Deshabilitado con éxito!');
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>DESHABILITAR</Text>
      <Text style={styles.subtitulo}>¿Estás seguro de deshabilitar a este Deportista?</Text>
      <View style={styles.detalleContainer}>
        <Text style={styles.label}>Nombres</Text>
        <Text style={styles.valor}>{deportista.NombresDep}</Text>

        <Text style={styles.label}>Apellidos</Text>
        <Text style={styles.valor}>{deportista.ApellidosDep}</Text>

        <Text style={styles.label}>Cédula</Text>
        <Text style={styles.valor}>{deportista.CedulaDep}</Text>

        <Text style={styles.label}>Categoría</Text>
        <Text style={styles.valor}>{getCategoriaNombre(deportista.IdCat)}</Text>

        <Text style={styles.label}>Club</Text>
        <Text style={styles.valor}>{getClubNombre(deportista.IdClub)}</Text>

        <Text style={styles.label}>Entrenador</Text>
        <Text style={styles.valor}>{getEntrenadorNombre(deportista.IdEnt)}</Text>

        <Text style={styles.label}>Género</Text>
        <Text style={styles.valor}>{getGeneroNombre(deportista.IdGen)}</Text>

        <Text style={styles.label}>Provincia</Text>
        <Text style={styles.valor}>{getProvinciaNombre(deportista.IdPro)}</Text>

        <Text style={styles.label}>Usuario</Text>
        <Text style={styles.valor}>{getUsuarioNombre(deportista.IdUsu)}</Text>

        <Text style={styles.label}>Estado</Text>
        <Text style={styles.valor}>{getEstado(deportista.ActivoDep)}</Text>
      </View>

      <View style={styles.botonesContainer}>
        <TouchableOpacity style={styles.botonDeshabilitar} onPress={handleDeshabilitar}>
          <Text style={styles.textoBotonDeshabilitar}>Deshabilitar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonRegresar} onPress={() => navigation.goBack()}>
          <Text style={styles.textoBotonRegresar}>Regresar</Text>
        </TouchableOpacity>
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
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
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
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botonDeshabilitar: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  textoBotonDeshabilitar: {
    fontSize: 16,
    color: '#333',
  },
  botonRegresar: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
  },
  textoBotonRegresar: {
    fontSize: 16,
    color: '#fff',
  },
});

export default Delete;