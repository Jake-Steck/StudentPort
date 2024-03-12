import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_300Light, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";
import { useState } from 'react';

const img = 'https://assets.api.uizard.io/api/cdn/stream/28695123-53b2-493d-941a-ff98edcbefdf.png';

export default function CreateAccount({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
    }, []);

    let createUser = async (email, name) => {
        const ref = collection(db, "users");
        const userRef = await addDoc(ref, {
            email: email,
            name: name,
        });
        const createSubCollection = collection(userRef, "portfolio");
        await addDoc(createSubCollection, {
            classes: [],
            athletics: [],
            achievements: [],
            service: [],
            clubs: [],
            testing: [],
            other: [],
        });
        console.log("Document written with ID: ", userRef.id);
    }

    let signUp = () => {
        const lowerCaseEmail = email.toLowerCase(); // Convert email to lowercase

        createUserWithEmailAndPassword(auth, lowerCaseEmail, password)
            .then((userCredential) => {
                const user = userCredential.user;

                // Update user profile with first and last name
                updateProfile(auth.currentUser, {
                    displayName: `${firstName} ${lastName}`,
                }).then(() => {
                    console.log("Profile updated");
                    createUser(lowerCaseEmail, auth.currentUser.displayName);
                    navigation.navigate('Profile');
                }).catch((error) => {
                    console.error("Error updating profile: ", error);
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Error creating user: ", errorMessage);
                if (errorCode === 'auth/weak-password') {
                    alert('The password is too weak. Please make sure it is longer than 6 characters.');
                }
                if (errorCode === 'auth/email-already-in-use') {
                    alert('The email is already in use.');
                } else {
                    alert(errorMessage);
                }
            });
    };

    // console.log(auth.currentUser); // For Debugging

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
            <Image
                style={styles.image}
                source={{ uri: img }}
            />
            <Text style={styles.header}>StudentPort</Text>
            <Text style={styles.sub}>Your achievements in one place!</Text>
            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={text => setFirstName(text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={text => setLastName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <Button onPress={() => signUp()} />
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
            <Text style={styles.text}>{props.label ?? 'Create Account'}</Text>
        </TouchableOpacity>
    );
};

