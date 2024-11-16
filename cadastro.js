import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import styles from './stylecadastro'; // Importação do arquivo de estilos
import { auth, firestore } from './firebase.config';
import { addDoc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native'; // Para navegação

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [numeroResidencia, setNumeroResidencia] = useState(''); // Novo estado para número da residência
  const [diaNascimento, setDiaNascimento] = useState('1');
  const [mesNascimento, setMesNascimento] = useState('1');
  const [anoNascimento, setAnoNascimento] = useState('1934');
  const [ddd, setDdd] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  
  const navigation = useNavigation(); // Hook para navegação

  const handleCadastro = async () => {
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas informadas não coincidem.');
      return;
    }

    if (!endereco) {
      Alert.alert('Erro', 'Por favor, preencha o CEP corretamente para obter o endereço.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      const dadosCadastro = {
        nome,
        email,
        telefone: `${ddd}${telefone}`,
        dataNascimento: `${anoNascimento}-${mesNascimento}-${diaNascimento}`,
        endereco,
        numeroResidencia, // Incluindo o número da residência no cadastro
        uid: user.uid, 
      };

      await addDoc(collection(firestore, 'usuarios'), dadosCadastro);

      Alert.alert('Sucesso', 'Conta criada com sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'), // Redirecionamento após sucesso
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao criar a conta.');
      console.error('Erro ao cadastrar: ', error);
    }
  };

  const buscarEnderecoPorCep = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        Alert.alert('Erro', 'CEP não encontrado.');
        setEndereco('');
      } else {
        setEndereco(`${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar o endereço.');
      console.error('Erro ao buscar o endereço: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={text => setNome(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />

          <View style={styles.pickerContainer}>
            <TextInput
              style={[styles.input, { width: '25%' }]}
              placeholder="DDD"
              value={ddd}
              onChangeText={text => setDdd(text)}
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, { width: '75%' }]}
              placeholder="Telefone"
              value={telefone}
              onChangeText={text => setTelefone(text)}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.pickerContainer}>
            <TextInput
              style={[styles.input, { width: '50%' }]}
              placeholder="CEP"
              value={cep}
              onChangeText={(text) => {
                setCep(text);
                if (text.length === 8) {
                  buscarEnderecoPorCep(text);
                }
              }}
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, { width: '50%' }]}
              placeholder="Número"
              value={numeroResidencia}
              onChangeText={text => setNumeroResidencia(text)} // Novo campo de número da residência
              keyboardType="numeric"
            />
          </View>
          
          <TextInput
            style={[styles.input, { backgroundColor: endereco ? '#f0f0f0' : '#fff' }]}
            placeholder="Endereço"
            value={endereco}
            editable={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={senha}
            onChangeText={text => setSenha(text)}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirme a senha"
            value={confirmarSenha}
            onChangeText={text => setConfirmarSenha(text)}
            secureTextEntry
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleCadastro}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
