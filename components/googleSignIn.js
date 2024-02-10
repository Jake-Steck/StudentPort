import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../firebaseConfig.js";


export default function GoogleSignInButton() {
    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: '459354272716-e4v89j84g5af8h0jrspk1ohmup7uoigu.apps.googleusercontent.com',
        webClientId: '459354272716-8fcd6tq1lou02f5fksf2ifvh7nb9otv6.apps.googleusercontent.com',
    });

    useEffect(() => {
        if (response?.type === 'success') {
            handleGoogleSignIn(response);
        }
    }, [response]);

    useEffect(() => {
        console.log(JSON.stringify(userInfo));
    }, [userInfo]);


    async function handleGoogleSignIn(response) {
        if (response?.type === 'success') {
            const { id_token } = response.params;

            try {
                const credential = GoogleAuthProvider.credential(id_token);
                const authResult = await signInWithCredential(auth, credential);

                navigation.navigate('Profile', { userInfo: authResult.user.displayName });

                // Continue with fetching user info if needed
                await getUserInfo(response.authentication.accessToken);
            } catch (error) {
                console.error('Firebase authentication failed:', error);
            }
        }
    }



    const getUserInfo = async (token) => {
        if (!token) {
            return;
        }
        try {
            const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                console.error('Failed to fetch user info:', response.status, response.statusText);
                return;
            }

            const userInfo = await response.json();
            setUserInfo(userInfo);
            await AsyncStorage.setItem('@user', JSON.stringify(userInfo));
        } catch (e) {
            console.error('Error during fetch:', e);
        }
    };

    console.log(JSON.stringify(userInfo)); // For Debugging


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
            fontWeight: 'bold',
            lineHeight: 20,
        },
    });

    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
                <Text style={styles.text}>Sign in With Google</Text>
            </TouchableOpacity>
        </View>
    );
}
