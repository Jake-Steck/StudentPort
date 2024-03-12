import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signOut } from "firebase/auth";
import { auth } from '../firebaseConfig';
import Classes, { ClassCard } from './classes'; // Import the ClassCard component
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function Profile() {
    const navigation = useNavigation();

    const SignOut = () => {
        signOut(auth).then(() => {
            console.log('Signed Out');
            navigation.push('SignIn');
        }).catch((error) => {
            console.error('Sign Out Error', error);
        });
    }

    const [fontsLoaded] = useFonts({
        Poppins_700Bold,
        Poppins_400Regular,
        Poppins_600SemiBold,
    });

    const reloadClasses = () => {
        // You can put any logic here that you want to trigger a reload in Classes.js
        console.log('Reloading Classes...');
    };

    if (!fontsLoaded) {
        return <Text>Loading...</Text>; // or any loading indicator
    }

    return (
        <View style={styles.container}>
            <View style={styles.bgCircle}></View>
            <Text style={styles.headerText}>Your Classes</Text>
            <Classes reloadClasses={reloadClasses} />
            <View style={styles.gap} />
            <Text style={styles.headerText}>Extra Curriculars</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
                <TouchableOpacity onPress={() => navigation.push('Sports')}>
                    <View style={styles.curricularContainer}>
                        <MaterialIcons name="sports-football" size={50} color="black" />
                        <Text style={styles.iconText}>Sports</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.currGap} />
                <TouchableOpacity onPress={() => navigation.push('Clubs')}>
                    <View style={styles.curricularContainer}>
                        <MaterialIcons name="groups" size={50} color="black" />
                        <Text style={styles.iconText}>Clubs</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.currGap} />
                <TouchableOpacity onPress={() => navigation.push('Service')}>
                    <View style={styles.curricularContainer}>
                        <FontAwesome5 name="hands-helping" size={50} color="black" />
                        <Text style={styles.iconText}>Service</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.currGap} />
                <TouchableOpacity onPress={() => navigation.push('Other')}>
                    <View style={styles.curricularContainer}>
                        <MaterialCommunityIcons name="pencil" size={50} color="black" />
                        <Text style={styles.iconText}>Testing</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.currGapEnd} />
            </ScrollView>
            <View style={styles.gap} />
            <Text style={styles.headerText}>Achievements</Text>
            <TouchableOpacity style={styles.achievementContainer} onPress={() => navigation.push("ShowAchievements")}>
                <View style={styles.trophy}>
                    <MaterialCommunityIcons name="trophy" size={100} color="black" />
                </View>
                <Text style={[styles.achievementText]}>Add your achievements</Text>
                <View style={[styles.accentLine]}></View>
            </TouchableOpacity>
            <View style={styles.floor}>
                <View style={styles.signOut}>
                    <Text style={styles.signOut} onPress={SignOut}>Sign Out</Text>
                </View>
                <View style={styles.push}>
                    <MaterialCommunityIcons onPress={() => navigation.push('Portfolio')} name="plus-circle" size={70} color="black" />
                </View>
            </View>
        </View >
    );
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        top: 80,
    },
    classContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 50,
        marginLeft: -45,
        backgroundColor: 'lightgray',
        width: 260,
        height: 180,
        borderRadius: 20,

    },
    headerText: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 20,
        textAlign: 'left',
        left: 35,
        fontWeight: 'bold',

    },
    headerText2: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 20,
        textAlign: 'left',
        left: 35,
        fontWeight: 'bold',
        marginTop: 10,
    },
    achievementText: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 16,
        textAlign: 'left',
        left: 130,
        fontWeight: 'bold',
        bottom: 70,
        width: 120,
    },
    gap: {
        marginBottom: 20,
    },
    curricularContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        left: 35,
        backgroundColor: 'lightgray',
        width: 100,
        height: 100,
        borderRadius: 20,
    },
    iconText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 15,
        textAlign: 'center',
        color: 'black',
    },
    currGap: {
        paddingRight: 16,
    },
    currGapEnd: {
        paddingRight: 45,
    },
    achievementContainer: {
        alignSelf: 'center',
        backgroundColor: "lightgray",
        width: 350,
        height: 175,
        borderRadius: 24,
        marginTop: 10
    },

    floor: {
        flexDirection: 'row',
        position: 'absolute',
        top: 752,
        left: 0,
        right: 0,
        height: 100,
        backgroundColor: '#3498db',
    },
    push: {
        left: '200%',
        top: 10,
    },
    signOut: {
        left: '20%',
        top: 15,
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        color: 'black',
    },
    trophy: {
        borderRadius: 12,
        width: "30%",
        //backgroundColor: 'white',
        //borderColor: "#3498db",
        //borderWidth: 4,
        alignItems: 'center',
        top: "20%",
        left: "3%",
    },
    accentLine: {
        width: "45%",
        height: 5,
        backgroundColor: "#3498db",
        alignSelf: 'center',
        bottom: 60,
        marginLeft: 55,
        borderRadius: 24,
    },
    testScoresContainer: {
        alignSelf: 'center',
        backgroundColor: "lightgray",
        width: 350,
        height: 100,
        borderRadius: 24,
        marginTop: 10
    },
    testScoresText: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 20,
        textAlign: 'left',
        left: 40,
        fontWeight: 'bold',
        top: 15,
        width: 150,
    },
    accentLine2: {
        width: "65%",
        height: 5,
        backgroundColor: "#3498db",
        alignSelf: 'left',
        top: 20,
        marginLeft: 40,
        borderRadius: 24,
    },
    bgCircle: {
        backgroundColor: "#3498db",
        width: 450,
        height: 375,
        top: -200,
        borderRadius: 200,
        alignSelf: 'center',
        opacity: 0.8,
        position: 'absolute',
    }
});
