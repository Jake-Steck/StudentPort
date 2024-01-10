import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_300Light, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GoogleSignInButton() {
    const [userInfo, setUserInfo] = useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: '459354272716-e4v89j84g5af8h0jrspk1ohmup7uoigu.apps.googleusercontent.com'
    });

    async function handleGoogleSignIn() {
        try {
            const result = await promptAsync();

            if (result?.type === 'success' && result.authentication?.accessToken) {
                const { authentication } = result;

                // Call your function to get user info using the access token
                await getUserInfo(authentication.accessToken);
            } else if (result?.type === 'cancel') {
                // Handle case where the user cancels the sign-in
                console.log('Google sign-in cancelled');
            } else {
                // Handle other cases
                console.log('Google sign-in failed');
            }
        } catch (error) {
            console.error('Error during Google sign-in:', error);
        }
    }


    const getUserInfo = async (token) => {
        try {
            const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${token}` },
            });

            const user = await response.json();

            // Save user info to AsyncStorage
            await AsyncStorage.setItem('@user', JSON.stringify(user));

            // Update state with user info
            setUserInfo(user);
        } catch (e) {
            console.error('Error getting user info:', e);
        }
    };

    const styles = StyleSheet.create({
        button: {
            marginTop: 20,
            width: 164,
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

    console.log(JSON.stringify(userInfo));

    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={handleGoogleSignIn} >
                <Text style={styles.text}>Google</Text>
            </TouchableOpacity >
        </View>
    );
}
