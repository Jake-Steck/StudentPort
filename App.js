import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import OpenScreen from './pages/openScreen';
import SignIn from './pages/signIn'
import Profile from './pages/profile'
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="OpenScreen"
        screenOptions={{
          headerShown: true
        }}
      >
        <Stack.Screen name="OpenScreen" component={OpenScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});