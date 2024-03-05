import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { removeFromPortfolio, getClasses, getUser } from '../components/firestoreData';
import { useFonts, Poppins_700Bold, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';

export default function Classes() {
    const [fontsLoaded] = useFonts({
        Poppins_700Bold,
        Poppins_400Regular,
        Poppins_600SemiBold,
    });

    const [classes, setClasses] = useState([]);
    const [itemClicked, setItemClicked] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await getUser();
                const response = await getClasses(user);
                console.log('Classes:', response);
                setClasses(response);

            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };

        fetchData();
    }, [itemClicked]);

    const handleRemove = (item) => {
        removeFromPortfolio(item, "classes");
        setItemClicked(!itemClicked);
    }

    if (!fontsLoaded) {
        return <Text>Loading...</Text>; // or any loading indicator
    }

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                {classes.map((item, index) => (
                    <React.Fragment key={index}>
                        <ClassCard className={item} onRemove={() => handleRemove(item)} />
                        {index !== classes.length - 1}
                    </React.Fragment>
                ))}
            </View>
        </ScrollView>
    );
}

export function ClassCard({ className, onRemove }) {


    return (
        <View style={styles.classContainer}>
            <View style={styles.classImage}>
                <View style={styles.classIconBox}>
                    <Ionicons name="school" size={20} color="black" />
                </View>
            </View>
            <View style={styles.horizontal}>
                <Text style={styles.classText}>{className}</Text>
                <MaterialIcons style={styles.remove} name="highlight-remove" size={24} color="black" onPress={onRemove} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    classText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 20,
        textAlign: 'center',
        color: 'black',
        top: 60,
        right: 200
    },
    classContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 30,
        backgroundColor: 'lightgray',
        width: 260,
        height: 180,
        borderRadius: 20,
    },
    classImage: {
        width: 210,
        height: 100,
        borderRadius: 20,
        marginLeft: 10,
        top: -30,
        backgroundColor: '#0e0e0e',
    },
    classIconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'white',
        left: 160,
        top: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollViewContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    remove: {
        top: 60,
        right: 85,
    },
});
