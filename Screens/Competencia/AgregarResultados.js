import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

const AgregarResultados = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [competencia, setCompetencia] = useState({});
  const [detalleCompetencia, setDetalleCompetencia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fase, setFase] = useState('clasificacion');

  useEffect(() => {
    // Simulación de carga de datos (reemplaza con tu lógica de API)
    const competenciaData = {
      id: route.params.idCom,
      nombre: 'Competencia Ejemplo',
      fechaInicio: '2024-03-01',
      fechaFin: '2024-03-31',
      genero: 'Masculino',
      juez: 'Juez Ejemplo',
      categoria: 'Categoría A',
      sede: 'Sede Ejemplo',
      modalidad: 'Modalidad 1',
      estado: 'Activo',
    };
    setCompetencia(competenciaData);

    const detalleCompetenciaData = [
      {
        id: 1,
        puesto: 1,
        clasRes: '10.00',
        octavosRes: null,
        cuartosRes: null,
        semiRes: null,
        finalRes: null,
        deportista: 'Deportista 1',
      },
      {
        id: 2,
        puesto: 2,
        clasRes: '10.50',
        octavosRes: null,
        cuartosRes: null,
        semiRes: null,
        finalRes: null,
        deportista: 'Deportista 2',
      },
      // Agrega más detalles de competencia según sea necesario
    ];
    setDetalleCompetencia(detalleCompetenciaData);
    setLoading(false);
  }, []);

  const handleAgregarResultado = (id, resultado, fase) => {
    // Lógica para agregar resultado (p. ej., API call)
    console.log('Agregar resultado:', id, resultado, fase);
    // Actualizar la lista de detalles de competencia
    const updatedDetalleCompetencia = detalleCompetencia.map((item) => {
      if (item.id === id) {
        return { ...item, [`${fase}Res`]: resultado };
      }
      return item;
    });
    setDetalleCompetencia(updatedDetalleCompetencia);
  };

  const handleClasificacion = () => {
    setFase('clasificacion');
  };

  const handleOctavos = () => {
    setFase('octavos');
  };

  const handleCuartos = () => {
    setFase('cuartos');
  };

  const handleSemi = () => {
    setFase('semi');
  };

  const handleFinal = () => {
    setFase('final');
  };

  const handleReporte = () => {
    // Lógica para generar reporte (p. ej., API call)
    console.log('Generar reporte');
  };

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>RESULTADOS</Text>
      <View style={styles.competenciaContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{competencia.nombre}</Text>
        <Text style={styles.label}>Fecha Inicio:</Text>
        <Text style={styles.value}>{competencia.fechaInicio}</Text>
        <Text style={styles.label}>Fecha Fin:</Text>
        <Text style={styles.value}>{competencia.fechaFin}</Text>
        <Text style={styles.label}>Género:</Text>
        <Text style={styles.value}>{competencia.genero}</Text>
        <Text style={styles.label}>Juez:</Text>
        <Text style={styles.value}>{competencia.juez}</Text>
        <Text style={styles.label}>Categoría:</Text>
        <Text style={styles.value}>{competencia.categoria}</Text>
        <Text style={styles.label}>Sede:</Text>
        <Text style={styles.value}>{competencia.sede}</Text>
        <Text style={styles.label}>Modalidad:</Text>
        <Text style={styles.value}>{competencia.modalidad}</Text>
        <Text style={styles.label}>Estado:</Text>
        <Text style={styles.value}>{competencia.estado}</Text>
      </View>
      <View style={styles.detalleCompetenciaContainer}>
        <FlatList
          data={detalleCompetencia}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.detalleCompetencia}>
              <Text style={styles.label}>Puesto:</Text>
              <Text style={styles.value}>{item.puesto}</Text>
              <Text style={styles.label}>Resultado Clasificación:</Text>
              <Text style={styles.value}>{item.clasRes}</Text>
              {fase === 'octavos' && (
                <View>
                  <Text style={styles.label}>Resultado Octavos:</Text>
                  <Text style={styles.value}>{item.octavosRes}</Text>
                </View>
              )}
              {fase === 'cuartos' && (
                <View>
                  <Text style={styles.label}>Resultado Cuartos:</Text>
                  <Text style={styles.value}>{item.cuartosRes}</Text>
                </View>
              )}
              {fase === 'semi' && (
                <View>
                  <Text style={styles.label}>Resultado Semi:</Text>
                  <Text style={styles.value}>{item.semiRes}</Text>
                </View>
              )}
              {fase === 'final' && (
                <View>
                  <Text style={styles.label}>Resultado Final:</Text>
                  <Text style={styles.value}>{item.finalRes}</Text>
                </View>
              )}
              <Text style={styles.label}>Deportista:</Text>
              <Text style={styles.value}>{item.deportista}</Text>
              <TouchableOpacity
                style={styles.botonAgregarResultado}
                onPress={() =>
                  Alert.prompt('Ingrese el resultado', '', (resultado) =>
                    handleAgregarResultado(item.id, resultado, fase)
                  )
                }
              >
                <Text style={styles.botonTexto}>Agregar Resultado</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <View style={styles.botonesContainer}>
        <TouchableOpacity style={styles.botonClasificacion} onPress={handleClasificacion}>
          <Text style={styles.botonTexto}>Clasificación</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonOctavos} onPress={handleOctavos}>
          <Text style={styles.botonTexto}>Octavos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonCuartos} onPress={handleCuartos}>
          <Text style={styles.botonTexto}>Cuartos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonSemi} onPress={handleSemi}>
          <Text style={styles.botonTexto}>Semi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonFinal} onPress={handleFinal}>
          <Text style={styles.botonTexto}>Final</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonReporte} onPress={handleReporte}>
          <Text style={styles.botonTexto}>Reporte</Text>
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
  competenciaContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  detalleCompetenciaContainer: {
    width: '100%',
  },
  detalleCompetencia: {
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
  botonClasificacion: {
    backgroundColor: '#007bff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  botonOctavos: {
    backgroundColor: '#6610f2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  botonCuartos: {
    backgroundColor: '#6f42c1',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  botonSemi: {
    backgroundColor: '#e83e8c',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  botonFinal: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  botonReporte: {
    backgroundColor: '#28a745',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
  },
  botonAgregarResultado: {
    backgroundColor: '#17a2b8',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});

export default AgregarResultados;