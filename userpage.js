import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from './firebase.config';
import MapView, { Marker } from 'react-native-maps';

const UserPage = ({ navigation }) => {
  const handleLogout = () => {
    signOut(auth).then(() => {
      navigation.navigate('Homepage');
    }).catch((error) => {
      console.error('Erro ao sair: ', error);
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: -23.55052,
          longitude: -46.633308,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Exemplo de marcador para a localização do usuário */}
        <Marker
          coordinate={{ latitude: -23.55052, longitude: -46.633308 }}
          title="Você está aqui"
        />
      </MapView>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  logoutButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UserPage;
