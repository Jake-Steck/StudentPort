import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_300Light, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { getUser, removeFromPortfolio, getService } from '../components/firestoreData';

export default function Service() {
    const [fontsLoaded] = useFonts({
        Poppins_700Bold,
        Poppins_300Light,
        Poppins_600SemiBold,
    });
    const [service, setService] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = await getUser();
                const response = await getService(userId);
                setService(response);
            } catch (error) {
                console.error('Error fetching service:', error);
            }
        };

        fetchData();
    }, []); // Remove itemClicked from the dependency array to avoid infinite loop

    if (!fontsLoaded) {
        return <Text>Loading...</Text>; // or any loading indicator
    }

    const handleRemove = async (item) => {
        await removeFromPortfolio(item, "service");
        const updatedService = await getService(userId);
        setService(updatedService);
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => handleRemove(item)}>
            <Text style={styles.itemText}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Service</Text>
            <FlatList
                data={service}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        padding: 20,
    },
    heading: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 25,
        marginBottom: 20,
    },
    itemContainer: {
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        elevation: 2,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: 'white',
    },
    itemText: {
        fontFamily: 'Poppins_300Light',
        fontSize: 18,
    },
});
