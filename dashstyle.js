import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080', // Fundo semitransparente para escurecer a imagem de fundo
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: '80%',
    backgroundColor: '#ffffffcc', // Fundo branco semitransparente para destacar o conteúdo
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  dashboardText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
});