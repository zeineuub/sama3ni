import 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './routers/HomeStack';

function App() {
  
  return (
    <NavigationContainer>
     <HomeStack />
    </NavigationContainer>
  );
}
export default gestureHandlerRootHOC(App);
