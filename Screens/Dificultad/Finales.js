import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Finales = () => {
  const [detalleCompetencia, setDetalleCompetencia] = useState([]);
  const [listaDeportistas, setListaDeportistas] = useState([
    { label: 'Deportista 1', value: 1 },
    { label: 'Deportista 2', value: 2 },
    // Agrega más deportistas según sea necesario
  ]);
  const [idCompetencia, setIdCompetencia] = useState(1); // Reemplaza con el ID de la competencia
  const [final, setFinal] = useState('');
  const [tiempo, setTiempo] = useState('');
  const [deportistaNombre, setDeportistaNombre] = useState('');
  const [idDetalle, setIdDetalle] = useState(0);
  const [mostrarGanador, setMostrarGanador] = useState(false);
  const [deportistasOrdenados, setDeportistasOrdenados] = useState([]);

  useEffect(() => {
    // Cargar los detalles de la competencia
    fetch(`https://tu-api.com/dificultad/${idCompetencia}`)
      .then((response) => response.json())
      .then((data) => setDetalleCompetencia(data));
  }, [idCompetencia]);

  const handleAgregarFinal = (id) => {
    // Mostrar el formulario de entrada de datos para clasificaciones
    Alert.prompt(
      'Agregar Final',
      'Ingrese el resultado final y el tiempo',
      (finalValue, tiempoValue) => {
        // Enviar los valores al servidor
        fetch(`https://tu-api.com/dificultad/agregar-final/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            final: finalValue,
            tiempo: tiempoValue,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              // Actualizar el valor en la tabla
              setDetalleCompetencia(
                detalleCompetencia.map((item) =>
                  item.idDetalleDificultad === id
                    ? { ...item, FinalRes: finalValue, TiempoRes: tiempoValue }
                    : item
                )
              );

              // Verificar si todos los resultados están llenos después de actualizar
              verificarResultadosLlenos();
            } else {
              Alert.alert('Error', 'Hubo un error al guardar los valores.');
            }
          })
          .catch((error) => {
            Alert.alert('Error', 'Hubo un error en la solicitud al servidor.');
          });
      }
    );
  };

  const verificarResultadosLlenos = () => {
    const todosLlenos = detalleCompetencia.every(
      (item) => item.FinalRes !== '' && item.TiempoRes !== ''
    );

    // Muestra u oculta el botón en función de si todos los campos están llenos
    setMostrarGanador(todosLlenos);
  };

  const handleAsignarPuestos = () => {
    // Enviar la solicitud al servidor para asignar puestos
    fetch(`https://tu-api.com/dificultad/asignar-puestos/${idCompetencia}`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Mostrar la tabla de deportistas ordenados
          setDeportistasOrdenados(data.deportistas);
          setMostrarGanador(false);
        } else {
          Alert.alert('Error', 'Hubo un error al asignar los puestos.');
        }
      })
      .catch((error) => {
        Alert.alert('Error', 'Hubo un error en la solicitud al servidor.');
      });
  };

  const handleExportarExcel = () => {
    // Descargar el archivo
    fetch(`https://tu-api.com/dificultad/exportar-excel/${idCompetencia}`)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'reporte.xlsx');
        document.body.appendChild(link);
        link.click();
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RESULTADOS DIFICULTAD</Text>
      <Text style={styles.subtitle}>Agregar Resultados</Text>
      <View style={styles.separator} />

      <FlatList
        data={detalleCompetencia}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.PuestoInicialRes}</Text>
            <Text style={styles.cell}>
              {item.IdDepNavigation.NombresDep} {item.IdDepNavigation.ApellidosDep}
            </Text>
            <Text style={styles.cell}>{item.FinalRes}</Text>
            <Text style={styles.cell}>{item.TiempoRes}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleAgregarFinal(item.idDetalleDificultad)}
            >
              <Text style={styles.buttonText}>Agregar Finales</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.idDetalleDificultad.toString()}
      />

      {mostrarGanador && (
        <TouchableOpacity style={styles.button} onPress={handleAsignarPuestos}>
          <Text style={styles.buttonText}>Asignar Puestos</Text>
        </TouchableOpacity>
      )}

      {deportistasOrdenados.length > 0 && (
        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>GANADOR</Text>
          <FlatList
            data={deportistasOrdenados}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.cell}>
                  {item.idDepNavigation.nombresDep} {item.idDepNavigation.apellidosDep}
                </Text>
              </View>
            )}
            keyExtractor={(item) => item.idDetalleDificultad.toString()}
          />
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleExportarExcel}>
        <Text style={styles.buttonText}>Reporte</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
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
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cell: {
    width: '20%',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  tableContainer: {
    marginBottom: 20,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Finales;