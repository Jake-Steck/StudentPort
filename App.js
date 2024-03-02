import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import OpenScreen from './pages/openScreen';
import SignIn from './pages/signIn'
import Profile from './pages/profile'
import ForgotPassword from './pages/forgotPassword'
import CreateAccount from './pages/createAccount';
import Classes from './pages/classes';
import Sports from './pages/sports';
import Portfolio from './pages/portfolio';
import classesData from './components/portfolioData/classes_data.json';
import athleticsData from './components/portfolioData/athletics_data.json';

const Stack = createNativeStackNavigator();
const allData = [...classesData, ...athleticsData];

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="OpenScreen"
        screenOptions={{
          headerShown: true // on for debugging purposes
        }}
      >
        <Stack.Screen name="OpenScreen" component={OpenScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen
          name="Portfolio"
          component={Portfolio}
          initialParams={{ category: { data: allData } }}

        />
        <Stack.Screen name="Classes" component={Classes} />
        <Stack.Screen name="Sports" component={Sports} />
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