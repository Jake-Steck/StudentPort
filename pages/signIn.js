// ios: 459354272716-e4v89j84g5af8h0jrspk1ohmup7uoigu.apps.googleusercontent.com

import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_300Light, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { useState } from 'react';

import GoogleSignIn from '../components/googleSignIn';

const img = 'https://assets.api.uizard.io/api/cdn/stream/28695123-53b2-493d-941a-ff98edcbefdf.png';

export default function SignIn({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        setEmail("");
        setPassword("");
    }, []);


    let signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user.displayName);
                console.log(user.uid);
                navigation.navigate('Profile', { userInfo: user.displayName })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === "auth/invalid-credential") {
                    alert("Invalid Credentials");
                } else if (errorCode === "auth/invalid-email") {
                    alert("Invalid Email");
                } else {
                    alert(errorMessage);
                }
            });
    }

    const [fontsLoaded] = useFonts({
        Poppins_700Bold,
        Poppins_300Light,
        Poppins_600SemiBold,
    });

    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
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
            fontSize: 25,
            justifyContent: "center",
        },
        sub: {
            fontFamily: 'Poppins_300Light',
            fontSize: 15,
            padding: 15,
            justifyContent: "center",
            textAlign: "center",
        },
        tiny: {
            fontFamily: 'Poppins_300Light',
            fontSize: 10,
            textAlign: "right",
            alignSelf: "flex-end",
            right: 40,
            top: 5,
        },
        tiny2: {
            fontFamily: 'Poppins_600SemiBold',
            fontSize: 10,
            top: 10,
            color: '#0e0e0e',
        },
        orText: {
            fontFamily: 'Poppins_300Light',
            fontSize: 14,
            textAlign: 'center',
            alignSelf: 'center',
            color: '#0e0e0e',
            top: 16,
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
            height: 150,
            resizeMode: "contain",
        },
        input: {
            marginTop: 20,
            width: 327,
            height: 48,
            paddingHorizontal: 8,
            borderWidth: 1,
            borderColor: '#ccccd1',
            borderRadius: 12,
            backgroundColor: 'rgba(252,252,252,0.86)',
            color: '#222224',
            fontSize: 14,
            fontFamily: 'Poppins_300Light',
            lineHeight: 22,
        },
        cardContainer: {
            top: -150,
        },
        buttonContainer: {
            marginTop: 20,
        },
        buttonContainer2: {
            marginTop: 20,
            flexDirection: 'row',

        },
        spacer: {
            width: 10,
        },
        miniCardContainer: {
            top: 30,
            alignSelf: 'baseline',
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <Card />
                <Card2 />
            </View>
            <Image
                style={styles.image}
                source={{ uri: img }}
            />
            <Text style={styles.header}>StudentPort</Text>
            <Text style={styles.sub}>Your achievements in one place!</Text>
            <TextInput
                onChangeText={text => setEmail(text)}
                style={styles.input}
                placeholder="Email"

            />
            <TextInput
                onChangeText={text => setPassword(text)}
                style={styles.input}
                placeholder='Password'
                secureTextEntry={true}
            />
            <Text style={styles.tiny} onPress={() => navigation.replace('ForgotPassword')}>Forgot your password?</Text>
            <View style={styles.buttonContainer}>
                <Button
                    // Signin button
                    onPress={() => signIn()}
                />
            </View>
            <View style={styles.miniCardContainer}>
                <OrLineLeft />
                <OrLineRight />
            </View>
            <Text style={styles.orText}>or</Text>
            <View style={styles.buttonContainer2}>
                <GoogleButton />
                <View style={styles.spacer} />
            </View>
            <Text style={styles.tiny2} onPress={() => navigation.replace('CreateAccount')}>Need an account? Register</Text>
        </View>
    );
}

// Sign In Button
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
            lineHeight: 20,
        }
    });

    return (
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <Text style={styles.text}>{props.label ?? 'Sign In'}</Text>
        </TouchableOpacity>
    );
};

// Light Bar
const Card = () => {
    const styles = StyleSheet.create({
        card: {
            width: 165,
            height: 4,
            backgroundColor: '#DCDCDC',
            borderRadius: 100,
            left: -90,
            top: 80,
        },
    });

    return (
        <View style={styles.card} />
    );
};

// Dark Bar
const Card2 = () => {
    const styles = StyleSheet.create({
        card: {
            width: 165,
            height: 4,
            backgroundColor: '#0e0e0e',
            borderRadius: 100,
            top: 76,
            left: 100,
        },
    });

    return (
        <View style={styles.card} />
    );
};

// Left Line
const OrLineLeft = () => {
    const styles = StyleSheet.create({
        card: {
            width: 150,
            height: 2,
            backgroundColor: '#DCDCDC',
            borderRadius: 100,
            left: 30,
        },
    });

    return (
        <View style={styles.card} />
    );
};

// Right Line
const OrLineRight = () => {
    const styles = StyleSheet.create({
        card: {
            width: 150,
            height: 2,
            backgroundColor: '#DCDCDC',
            borderRadius: 100,
            left: 210,
            top: -2,
        },
    });

    return (
        <View style={styles.card} />
    );
};

// Sign in with google button
const GoogleButton = (props) => {
    return (
        <GoogleSignIn />
    );
}
