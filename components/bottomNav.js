import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';
// Screen Imports Here
import Profile from '../pages/profile';

import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { Ionicons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

export default function BottomNav() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#000',
                tabBarStyle: {
                    backgroundColor: 'white',
                    height: 60,
                    borderRadius: 20,
                    marginHorizontal: 20,
                    bottom: 20,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 10,
                    },
                    shadowOpacity: 0.53,
                    shadowRadius: 13.97,
                }
            }}
        >
            {/* <Tab.Screen
                name="Portfolio"
                component={Portfolio}
                options={{
                    headerShown: false, tabBarIcon: ({ color, size }) =>
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: '40%' }}>
                            <MaterialCommunityIcons
                                name="home"
                                color={color}
                                size={30}
                            />
                        </View>
                }} /> */}

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerShown: false, tabBarIcon: ({ color, size }) =>
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: '40%' }}>
                            <MaterialCommunityIcons
                                name="profile"
                                color={color}
                                size={30} />
                        </View>
                }} />


        </ Tab.Navigator>
    );
}

export { BottomNav };