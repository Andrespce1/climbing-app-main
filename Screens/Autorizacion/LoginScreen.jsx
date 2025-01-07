import React, {useEffect} from 'react';
import { StatusBar } from "expo-status-bar";
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";

import {Button, Image} from '@rneui/base';

import api from '../../services/api';
import useAppStorageHook from './../../storage/appStorage';

const LoginScreen = () => {
  const {appUser,unsetAppUser,setAppUser} = useAppStorageHook();

  const [correo, onChangeCorreo] = React.useState('');
  const [contrasenia, onChangePassword] = React.useState('');
  const [mailOk, setMailOk] = React.useState(true);
  const [mailInput, setMailInput] = React.useState(true);

  const navigation = useNavigation();

  const forgotPasswordHandler = async () => {
    console.log('forgotPasswordHandler');
  };

  const loginRequest = async () => {
    console.log('looooooogiiin2');
    

    console.log('Correo: ' + correo);
    console.log('Contraseña: ' + contrasenia);
    console.log('api: /api/Usuario/login');
    api
      .post('/api/Usuario/login', {
        nombreUsu: correo,
        claveUsu: contrasenia
      })
      .then(response => {
        console.log('Respuesta: ' + JSON.stringify(response.data));

        setAppUser({
          ...response.data,
        });
      })
      .catch(error => {
        Alert.alert('Credenciales inválidas');
        console.log('Error: ' + error);
      });
  };


  useEffect(() => {}, [correo, contrasenia]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeCorreo}
        value={correo}
        placeholder={'Correo'}
        keyboardType="email-address"
        autoCapitalize={'none'}
      />
      

      <TextInput
        value={contrasenia}
        onChangeText={onChangePassword}
        placeholder={'Contraseña'}
        secureTextEntry={true}
        style={styles.input}
      />

      <Button
        disabled={!(mailOk && mailInput)}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        title={'Iniciar Sesión'}
        onPress={() => loginRequest()}
      />
      
      <Button
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        title={'Olvidé mi contraseña'}
        onPress={() => {
          //navigate('RecoverScreen');
          navigation.navigate('ForgotScreen');
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    flexDirection: 'row',
    marginBottom: 20,
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: '#007bff',
  },
  buttonContainer: {
    width: '80%',
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 200,
  },
  input: {
    width: '80%',
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default LoginScreen;
