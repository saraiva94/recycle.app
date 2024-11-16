import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Cadastro from './cadastro';
import RecuperacaoSenha from './recuperacaosenha';
import Homepage from './homepage';
import styles from './styles';
import { auth } from './firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Stack = createStackNavigator();

export default function App() {
  const [userMail, setUserMail] = useState('');
  const [userPass, setUserPass] = useState('');

  const userLogin = (navigation) => {
    signInWithEmailAndPassword(auth, userMail, userPass)
      .then((userCredential) => {
        alert('Login efetuado com sucesso!');
        navigation.navigate('dashboard');
      })
      .catch((error) => {
        alert(`Erro: ${error.message}`);
      });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Homepage"
          options={{ headerShown: false }}
        >
          {(props) => (
            <HomeScreen
              {...props}
              userMail={userMail}
              setUserMail={setUserMail}
              userPass={userPass}
              setUserPass={setUserPass}
              userLogin={userLogin}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="RecuperacaoSenha" component={RecuperacaoSenha} />
        <Stack.Screen name="dashboard" component={Homepage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation, userLogin, userMail, setUserMail, userPass, setUserPass }) {
  return (
    <View style={styles.container}>
      <Video
        source={require('./assets/reciclagem.mp4')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        isLooping
        shouldPlay
        rate={0.33}
      />
      <View style={styles.overlay}>
        <View style={styles.loginContainer}>
          <TextInput
            style={styles.input}
            placeholder="Informe o e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            value={userMail}
            onChangeText={setUserMail}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={userPass}
            onChangeText={setUserPass}
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.button} onPress={() => userLogin(navigation)}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          <View style={styles.linkContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
              <Text style={styles.link}>Cadastre-se</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('RecuperacaoSenha')}>
              <Text style={styles.link}>Esqueci a senha</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
