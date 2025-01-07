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

const ForgotScreen = () => {

  const [correo, onChangeCorreo] = React.useState('');
  const [contrasenia, onChangePassword] = React.useState('');
  const [mailOk, setMailOk] = React.useState(true);
  const [mailInput, setMailInput] = React.useState(true);

  const navigation = useNavigation();

  const forgotPasswordHandler = async () => {
    console.log('forgotPasswordHandler');
  };

  const validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log('Email is Not Correct');
      onChangeCorreo(text);
      setMailOk(false);
      setMailInput(true);
      return false;
    } else {
      onChangeCorreo(text);
      console.log('Email is Correct');
      setMailOk(true);
      setMailInput(true);
    }
  };

  useEffect(() => {}, [correo, contrasenia]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={text => validate(text)}
        value={correo}
        placeholder={'MAIL'}
        keyboardType="email-address"
        autoCapitalize={'none'}
      />

      {mailOk == false && mailInput == true && (
        <Text style={{color: '#FF0000'}}>{'WRONG_MAIL'}</Text>
      )}


      <Button
        disabled={!(mailOk && mailInput)}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        title={'LOGIN'}
        onPress={() => loginRequest()}
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
  },
});

export default ForgotScreen;
