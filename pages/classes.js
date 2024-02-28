// Inside classes.js

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_300Light, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { FirestoreData } from '../components/firestoreData';

export default function Classes() {
    const [fontsLoaded] = useFonts({
        Poppins_700Bold,
        Poppins_300Light,
        Poppins_600SemiBold,
    });
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = await FirestoreData.getUser();
                const response = await FirestoreData.getClasses(userId);
                setClasses(response);

            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };
        fetchData();

    }, []);

    if (!fontsLoaded) {
        return <Text>Loading...</Text>; // or any loading indicator
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Classes</Text>
            {classes.map((item, index) => (
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
