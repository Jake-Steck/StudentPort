import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_300Light, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { useNavigation } from '@react-navigation/native';
import { addToPortfolio } from '../components/firestoreData';

export default function Achievements() {
    const [fontsLoaded] = useFonts({
        Poppins_700Bold,
        Poppins_300Light,
        Poppins_600SemiBold,
    });

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const navigation = useNavigation();

    const handleSubmission = async () => {
        // Perform any validation checks if needed

        try {
            // Call the addToPortfolio function with the entered information
            await addToPortfolio(`${name} - ${description}`, "achievements");

            navigation.push('Profile');
        } catch (error) {
            console.error('Error adding to portfolio:', error);
            // Handle errors or provide user feedback as needed
        }
    };


    if (!fontsLoaded) {
        return <Text>Loading...</Text>; // or any loading indicator
    }

    return (
        <View style={styles.container}>
            <View style={styles.gap} />
            <Text style={styles.heading}>Achievements</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.iconText}>New Achievement</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Enter Achievement'
                    onChangeText={setName}
                />

                <Text style={styles.iconText}>Description / Details</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Enter Description'
                    onChangeText={setDescription}
                />
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmission}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.back} onPress={() => navigation.push('Profile')}>Back</Text>
            </TouchableOpacity>
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
        marginBottom: 0,
        alignSelf: 'center',
        top: 30,
    },
    inputContainer: {
        borderRadius: 24,
        width: 350,
        height: 240,
        backgroundColor: 'lightgray',
        alignSelf: 'center',
        alignItems: 'left',
        top: 40,
    },
    input: {
        marginTop: 7,
        width: 327,
        height: 48,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: '#ccccd1',
        borderRadius: 12,
        backgroundColor: 'rgba(252,252,252,0.86)',
        color: '#222224',
        fontSize: 14,
        lineHeight: 22,
        marginLeft: 10,
    },
    iconText: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 16,
        marginLeft: 15,
        marginTop: 5,
        textAlign: 'left',
        color: 'black',
    },
    gap: {
        marginTop: 15,
    },
    submitButtonText: {
        color: 'black',
        fontFamily: 'Poppins_600SemiBold',
    },
    submitButton: {
        marginTop: -23,
        width: 150,
        height: 48,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: '#0e0e0e',
        borderRadius: 12,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    back: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 18,
        textAlign: 'center',
        top: 40,
        color: 'black',
    },
});
