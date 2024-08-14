import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from './components/screens/Inicio';
import Home from './components/screens/Home';

const Stack = createNativeStackNavigator()

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inicio" component={Inicio} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

