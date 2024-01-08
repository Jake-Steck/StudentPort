import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_300Light, Poppins_600SemiBold } from '@expo-google-fonts/poppins'; // Font library loaded in

const homeImg = 'https://assets.api.uizard.io/api/cdn/stream/78f4b240-40ec-430a-8851-5f03a867268a.png'; // Variable for image displayed on home screen


// All components loaded onto the opening screen
export default function OpenScreen({ navigation }) {
    const [fontsLoaded] = useFonts({
        Poppins_700Bold,
        Poppins_300Light,
        Poppins_600SemiBold,

    });

    if (!fontsLoaded) {
        return <Text>Loading...</Text>; // or any loading indicator
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
        header: {
            fontFamily: 'Poppins_700Bold',
            fontSize: 35,
            justifyContent: "center",
        },
        sub: {
            fontFamily: 'Poppins_300Light',
            fontSize: 15,
            padding: 15,
            justifyContent: "center",
            textAlign: "center",
        },
        imageContainer: {
            width: 200,
            height: 200,
            justifyContent: "flex-start",
            alignItems: "center",
            top: -80,
        },
        image: {
            width: 400,
            height: 270,
            resizeMode: "contain",
        },
        cardContainer: {
            top: -150,
        },
        buttonContainer: {
            marginTop: 0,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <Card />
                <Card2 />
            </View>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: homeImg }}
                />
            </View>
            <Text style={styles.header}>Welcome to {'\n'}StudentPort!</Text>
            <Text style={styles.sub}>StudentPort is the ultimate app for students to showcase their achievements and activities.</Text>
            <View style={styles.buttonContainer}>
                <Button
                    label="Next"
                    onPress={() => navigation.navigate('SignIn')}
                />
            </View>
        </View>
    );
}

// Next Button
const Button = (props) => {
    const styles = StyleSheet.create({
        button: {
            marginTop: 20,
            width: 335,
            height: 48,
            paddingHorizontal: 8,
            borderWidth: 1,
            borderColor: '#0e0e0e',
            borderRadius: 12,
            backgroundColor: '#ffffff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            color: '#0e0e0e',
            fontSize: 16,
            fontFamily: 'Poppins_600SemiBold',
            color: '#0e0e0e',
            fontWeight: '700',
            lineHeight: 20,
        },
    });

    return (
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <Text style={styles.text}>{props.label ?? 'Next'}</Text>
        </TouchableOpacity>
    );
};

// Black Bar
const Card = () => {
    const styles = StyleSheet.create({
        card: {
            width: 165,
            height: 4,
            backgroundColor: '#0e0e0e',
            borderRadius: 100,
            left: -90,
        },
    });

    return (
        <View style={styles.card} />
    );
};

// Lighter Bar
const Card2 = () => {
    const styles = StyleSheet.create({
        card: {
            width: 165,
            height: 4,
            backgroundColor: '#DCDCDC',
            borderRadius: 100,
            left: 90,
            top: -4,
        },
    });

    return (
        <View style={styles.card} />
    );
};