// Screens/Home/Index.js
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {Button, Image} from '@rneui/base';
import { useNavigation } from '@react-navigation/native';


const Index = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.customContainer}>
        <Text style={styles.title}>ESCALADA DEPORTIVA DE IMBABURA</Text>
      </View>
      <View style={styles.carouselContainer}>
        {/* Elementos de texto de prueba en lugar de imágenes */}
        <Text style={styles.carouselText}>Contenido 1</Text>
        <Text style={styles.carouselText}>Contenido 2</Text>
        <Text style={styles.carouselText}>Contenido 3</Text>
        <Text style={styles.carouselText}>Contenido 4</Text>
        <Text style={styles.carouselText}>Contenido 5</Text>
      </View>
      <Button
        buttonStyle={styles.buttonIniciar}
        containerStyle={styles.buttonContainer}
        title={"Iniciar Sesión"}
        onPress={() => {
          //navigate('RecoverScreen');
          navigation.navigate("LoginScreen");
        }}
      />
      <Button
        buttonStyle={styles.buttonComp}
        containerStyle={styles.buttonContainer}
        title={"Competencias en Vivo"}
        onPress={() => {
          //navigate('RecoverScreen');
          navigation.navigate("CompetenciasScreen");
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  customContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  carouselContainer: {
    flexDirection: "column", // Cambiado a columna para mostrar texto
    paddingVertical: 20,
    alignItems: "center", // Centra el contenido horizontalmente
  },
  carouselText: {
    fontSize: 18,
    marginVertical: 10, // Espaciado vertical entre textos
    color: "#555",
  },
  buttonIniciar: {
    flexDirection: 'row',
    marginBottom: 20,
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: '#007bff',
    margin:10,
  },
  buttonComp: {
    flexDirection: 'row',
    marginBottom: 20,
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: '#ffc107',
    margin:10,
  },
});

export default Index;
