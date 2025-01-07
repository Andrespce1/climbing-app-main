import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Index from '../Juez/Index';

// Simulación de datos (reemplaza con tu fuente de datos real)
const usuarios = [
  { IdUsu: 1, NombreUsu: 'Usuario1', ClaveUsu: '***', FechaCreacion: '2023-01-01', RolesUsu: 'Admin', ActivoUsu: true },
  { IdUsu: 2, NombreUsu: 'Usuario2', ClaveUsu: '***', FechaCreacion: '2023-01-02', RolesUsu: 'User', ActivoUsu: false },
  // Agrega más usuarios aquí...
];

const Stack = createStackNavigator();

function UsuarioItem({ item, navigation }) {
  return (
    <View style={styles.item}>
      <Text>Nombre de Usuario: {item.NombreUsu}</Text>
      <Text>Contraseña: {item.ClaveUsu}</Text>
      <Text>Fecha de Creación: {item.FechaCreacion}</Text>
      <Text>Roles: {item.RolesUsu}</Text>
      <Text>Estado: {item.ActivoUsu ? 'Activo' : 'Inactivo'}</Text>
      <View style={styles.botones}>
        <TouchableOpacity onPress={() => navigation.navigate('Editar', { id: item.IdUsu })}>
          <Text style={styles.boton}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Detalles', { id: item.IdUsu })}>
          <Text style={styles.boton}>Detalles</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Eliminar', { id: item.IdUsu })}>
          <Text style={styles.botonEliminar}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ListaUsuarios({ navigation }) {
  const [usuariosList, setUsuariosList] = useState(usuarios); // Simulación de estado

  useEffect(() => {
    // Aquí puedes hacer una llamada a una API para obtener los usuarios
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Listado de Usuarios</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Crear')}>
        <Text style={styles.botonCrear}>Crear</Text>
      </TouchableOpacity>
      <ScrollView>
        {usuariosList.map((item, index) => (
          <UsuarioItem key={index} item={item} navigation={navigation} />
        ))}
      </ScrollView>
    </View>
  );
}

function Index() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Lista" component={ListaUsuarios} />
        <Stack.Screen name="Crear" component={CrearUsuarioScreen} /> {/* Debes crear este componente */}
        <Stack.Screen name="Editar" component={EditarUsuarioScreen} /> {/* Debes crear este componente */}
        <Stack.Screen name="Detalles" component={DetallesUsuarioScreen} /> {/* Debes crear este componente */}
        <Stack.Screen name="Eliminar" component={EliminarUsuarioScreen} /> {/* Debes crear este componente */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
  },
  botonCrear: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  boton: {
    backgroundColor: '#ffc107',
    color: '#000000',
    padding: 5,
    borderRadius: 3,
    marginRight: 5,
  },
  botonEliminar: {
    backgroundColor: '#dc3545',
    color: '#ffffff',
    padding: 5,
    borderRadius: 3,
  },
});

export default Index;