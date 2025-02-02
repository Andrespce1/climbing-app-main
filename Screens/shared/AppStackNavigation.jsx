import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ClubStackNavigation from './ClubStackNavigation';
import SedeStackNavigation from './SedeStackNavigation';
import DeportistaStackNavigation from './DeportistaStackNavigation';
import CompetenciaStackNavigation from './CompetenciaStackNavigation';
import BienvenidaStackNavigation from '../Home/Bienvenida';
import JuezStackNavigation from './JuezStackNavigation';
import EntrenadorStackNavigation from './EntrenadorStackNavigation';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }) => {
  const [isInfraExpanded, setIsInfraExpanded] = useState(false);
  const [isParticipantsExpanded, setIsParticipantsExpanded] = useState(false);
  const [isCompetenciasExpanded, setIsCompetenciasExpanded] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {/* Home */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.drawerItem}>Inicio</Text>
      </TouchableOpacity>

      {/* Gestión de Participantes */}
      <TouchableOpacity
        onPress={() => setIsParticipantsExpanded(!isParticipantsExpanded)}
        style={styles.collapsibleHeader}
      >
        <Text style={styles.drawerItem}>Gestión de Participantes</Text>
      </TouchableOpacity>

      {/* Opciones del menú colapsable para Participantes */}
      {isParticipantsExpanded && (
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Deportista')}>
            <Text style={styles.subItem}>Deportista</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Juez')}>
            <Text style={styles.subItem}>Juez</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Entrenador')}>
            <Text style={styles.subItem}>Entrenador</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Gestión de Infraestructura */}
      <TouchableOpacity
        onPress={() => setIsInfraExpanded(!isInfraExpanded)}
        style={styles.collapsibleHeader}
      >
        <Text style={styles.drawerItem}>Gestión de Infraestructura</Text>
      </TouchableOpacity>

      {/* Opciones del menú colapsable para Infraestructura */}
      {isInfraExpanded && (
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Clubes')}>
            <Text style={styles.subItem}>Clubes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Sedes')}>
            <Text style={styles.subItem}>Sedes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Competencias')}>
            <Text style={styles.subItem}>Competencias</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Gestión de Competencias */}
      <TouchableOpacity
        onPress={() => setIsCompetenciasExpanded(!isCompetenciasExpanded)}
        style={styles.collapsibleHeader}
      >
        <Text style={styles.drawerItem}>Gestión de Competencias</Text>
      </TouchableOpacity>

      {/* Opciones del menú colapsable para Competencias */}
      {isCompetenciasExpanded && (
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('CompetenciaAgregarDeportistas')}>
            <Text style={styles.subItem}>Agregar Deportistas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CompetenciaAgregarResultados')}>
            <Text style={styles.subItem}>Agregar Resultados</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const AppStackNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true, // Mostrar encabezado
      }}
    >
      <Drawer.Screen name="Home" component={BienvenidaStackNavigation} />
      <Drawer.Screen name="Clubes" component={ClubStackNavigation} options={{ drawerLabel: () => null }} />
      <Drawer.Screen name="Sedes" component={SedeStackNavigation} options={{ drawerLabel: () => null }} />
      <Drawer.Screen name="Deportista" component={DeportistaStackNavigation} options={{ drawerLabel: () => null }} />
      <Drawer.Screen name="Juez" component={JuezStackNavigation} options={{ drawerLabel: () => null }} />
      <Drawer.Screen name="Entrenador" component={EntrenadorStackNavigation} options={{ drawerLabel: () => null }} />
      <Drawer.Screen name="Competencias" component={CompetenciaStackNavigation} options={{ drawerLabel: () => null }} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerItem: {
    padding: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  collapsibleHeader: {
    backgroundColor: '#f4f4f4',
    padding: 15,
  },
  subItem: {
    padding: 15,
    paddingLeft: 30,
    fontSize: 14,
    color: '#555',
  },
});

export default AppStackNavigation;