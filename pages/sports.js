// Inside sports.js

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_300Light, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { getUser, getUserPortfolioID, addToPortfolio, getClasses, getSports } from '../components/firestoreData';

export default function Sports() {
    const [fontsLoaded] = useFonts({
        Poppins_700Bold,
        Poppins_300Light,
        Poppins_600SemiBold,
    });
    const [sports, setSports] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = await getUser();
                const response = await getSports(userId);
                setSports(response);

            } catch (error) {
                console.error('Error fetching sports:', error);
            }
        };
        fetchData();

    }, []);

    if (!fontsLoaded) {
        return <Text>Loading...</Text>; // or any loading indicator
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Sports</Text>
            {sports.map((item, index) => (
                <Text key={index}>{item}</Text>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 25,
        justifyContent: "center",
    },
});
