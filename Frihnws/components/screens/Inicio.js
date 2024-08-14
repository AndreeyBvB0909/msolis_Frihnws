import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

const Inicio = ({ navigation }) => { // Accede a la función de navegación a través de las props
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Frihnws</Text>
      <Image
        source={require('../../assets/Frihnws-icon.png')}
        style={styles.icon}
      />
      <Button 
        title="Continuar" 
        onPress={() => navigation.navigate('Drawer')} // Navega a la pantalla "Home"
        color="#F0DB00" 
        backgroundColor="#000"
      />
    </View>
  );
};

export default Inicio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Fondo negro
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#F0DB00', // Color del texto
    fontSize: 50, // Tamaño de la fuente
    fontFamily: 'monospace', // Tipo de fuente
  },
  icon: {
    width: 500,  // Ancho del ícono
    height: 500, // Alto del ícono
  }
});

