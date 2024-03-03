// Inside sports.js

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_300Light, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { getUser, getUserPortfolioID, addToPortfolio, getClasses, getSports, removeFromPortfolio, getClubs } from '../components/firestoreData';

export default function Clubs() {
    const [fontsLoaded] = useFonts({
        Poppins_700Bold,
        Poppins_300Light,
        Poppins_600SemiBold,
    });
    const [clubs, setClubs] = useState([]);
    const [itemClicked, setItemClicked] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = await getUser();
                const response = await getClubs(userId);
                setClubs(response);

            } catch (error) {
                console.error('Error fetching sports:', error);
            }
        };
        fetchData();

    }, [itemClicked]);

    if (!fontsLoaded) {
        return <Text>Loading...</Text>; // or any loading indicator
    }

    const handleRemove = (item) => {
        removeFromPortfolio(item, "athletics");
        setItemClicked(!itemClicked);
    }



    return (
        <View style={styles.container}>
            <Text style={styles.text}>Clubs</Text>
            {clubs.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => handleRemove(item)}>
                    <Text key={index}>{item}</Text>
                </TouchableOpacity>
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
