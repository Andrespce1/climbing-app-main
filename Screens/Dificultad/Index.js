import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, Alert } from 'react-native';
import { Linking } from 'react-native';

const Index = () => {
  const [datos, setDatos] = useState([
    // Ejemplo de datos, reemplaza con tu propia lógica de carga
    { idDetalleDificultad: 1, nombresDep: 'Juan', apellidosDep: 'Pérez', Clas1Res: '', Clas2Res: '' },
    { idDetalleDificultad: 2, nombresDep: 'María', apellidosDep: 'Gómez', Clas1Res: '', Clas2Res: '' },
  ]);

  const [mostrarTabla, setMostrarTabla] = useState(false);
  const [deportistasClasificados, setDeportistasClasificados] = useState([]);
  const [idCompetencia, setIdCompetencia] = useState(1); // Reemplaza con tu lógica para obtener el ID de competencia

  const agregarClasificacion = (item) => {
    Alert.prompt(
      'Agregar Clasificaciones',
      'Ingrese clasificaciones',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancelar Pressed'),
          style: 'cancel',
        },
        {
          text: 'Guardar',
          onPress: (clasificacion1, clasificacion2) => {
            // Implementar lógica para guardar clasificaciones
            // Ejemplo con fetch, reemplaza con tu endpoint y lógica de backend
            fetch('/Dificultad/AgregarClasificaciones', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                idDetalle: item.idDetalleDificultad,
                clasificacion1,
                clasificacion2,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                // Actualiza el estado con los nuevos datos
                const updatedDatos = datos.map((dato) =>
                  dato.idDetalleDificultad === item.idDetalleDificultad
                    ? { ...dato, Clas1Res: clasificacion1, Clas2Res: clasificacion2 }
                    : dato
                );
                setDatos(updatedDatos);
              })
              .catch((error) => console.error(error));
          },
        },
      ],
      'plain-text',
      '',
      [null, null], // Clasificación 1 y 2 por defecto
    );
  };

  const verificarResultadosLlenos = () => {
    const todosLlenos = datos.every((dato) => dato.Clas1Res !== '' && dato.Clas2Res !== '');
    if (todosLlenos) {
      setMostrarTabla(true);
    } else {
      setMostrarTabla(false);
    }
  };

  const asignarPuestos = () => {
    // Implementar lógica para asignar puestos
    // Ejemplo, reemplaza con tu lógica de backend
    fetch('/Dificultad/AsignarPuestos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idCompetencia }),
    })
      .then((response) => response.json())
      .then((data) => {
        setDeportistasClasificados(data.deportistas);
        setMostrarTabla(true);
      })
      .catch((error) => console.error(error));
  };

  const redirigirAFinales = () => {
    // Con React Navigation
    // navigation.navigate('Finales', { competencia: idCompetencia });
    
    // Sin navegación gestionada, abrir URL (no recomendado para navegación dentro de la app)
    Linking.openURL(`https://example.com/Dificultad/Finales?competencia=${idCompetencia}`);
  };

  useEffect(() => {
    verificarResultadosLlenos();
  }, [datos]);

  return (
    <View style={styles.container}>
      <Text>RESULTADOS DIFICULTAD</Text>
      <Text>Agregar Resultados</Text>
      <hr />

      <View style={styles.row}>
        <View style={styles.colMd4}>
          {/* Información de competencia, reemplaza con tu componente o datos */}
          <Text>Información de Competencia</Text>
        </View>
      </View>

      <br />
      <Text>DETALLE</Text>

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text>Deportista</Text>
          <Text>Resultado Clasificación 1</Text>
          <Text>Resultado Clasificación 2</Text>
          <Text>Opciones</Text>
        </View>
        <View style={styles.tableBody}>
          {datos.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text>
                {item.nombresDep} {item.apellidosDep}
              </Text>
              <Text>{item.Clas1Res}</Text>
              <Text>{item.Clas2Res}</Text>
              <Button title="Agregar Clasificaciones" onPress={() => agregarClasificacion(item)} />
            </View>
          ))}
        </View>
      </View>

      <br />

      {mostrarTabla && (
        <View>
          <Text>Deportistas Clasificados</Text>
          <FlatList
            data={deportistasClasificados}
            renderItem={({ item }) => (
              <View style={styles.deportistaClasificado}>
                <Text>{item.nombresDep} {item.apellidosDep}</Text>
                <Text>Puesto: {item.puestoInicialRes}</Text>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      )}

      <Button title="Asignar Puestos" onPress={asignarPuestos} />
      <Button title="Ir a Finales" onPress={redirigirAFinales} />

      <View style={styles.reporteContainer}>
        <Button title="Reporte Clasificación" onPress={() => Linking.openURL(`https://example.com/Dificultad/MostrarPDFNuevaPaginaClas?competencia=${idCompetencia}`)} />
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
  row: {
    flexDirection: 'row',
  },
  colMd4: {
    width: '25%',
  },
  tableContainer: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tableBody: {},
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  deportistaClasificado: {
    marginBottom: 10,
  },
  reporteContainer: {
    marginTop: 20,
  },
});

export default Index;