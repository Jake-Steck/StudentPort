import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_300Light, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { getUser, removeFromPortfolio, getTesting } from '../components/firestoreData';

export default function Service() {
    const [fontsLoaded] = useFonts({
        Poppins_700Bold,
        Poppins_300Light,
        Poppins_600SemiBold,
    });
    const [testing, setTesting] = useState([]);
    const [itemClicked, setItemClicked] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = await getUser();
                const response = await getTesting(userId);
                setTesting(response);
            } catch (error) {
                console.error('Error fetching service:', error);
            }
        };

        fetchData();
    }, [itemClicked]); // Remove itemClicked from the dependency array to avoid infinite loop

    if (!fontsLoaded) {
        return <Text>Loading...</Text>; // or any loading indicator
    }

    const handleRemove = (item) => {
        removeFromPortfolio(item, "testing");
        setItemClicked(!itemClicked);
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => handleRemove(item)}>
            <Text style={styles.itemText}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Testing</Text>
            <FlatList
                data={testing}
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
        top: 50,
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
