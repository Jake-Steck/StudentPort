import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Profile({ route }) {
    const { userInfo } = route.params;
    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        Poppins_700Bold,
        Poppins_400Regular,
    });

    if (!fontsLoaded) {
        return <Text>Loading...</Text>; // or any loading indicator
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.circle} />
                <View style={styles.textContainer}>
                    <Text style={styles.nameText}>{userInfo?.name || userInfo}</Text>
                    <Text style={styles.subText}>School</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Classes</Text>
                <AntDesign name="right" size={15} color="black" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Portfolio')}>
                <Text style={styles.buttonText}>Portfolio**Delete When Done</Text>
                <AntDesign name="right" size={15} color="black" style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    circle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#0e0e0e',
        marginLeft: -50,
    },
    textContainer: {
        marginLeft: 20,
    },
    nameText: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 25,
    },
    subText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 15,
    },
    buttonText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 15,
        marginLeft: 10,
        justifyContent: 'center',
        textAlign: 'left',
    },
    button: {
        marginTop: 50,
        width: 335,
        height: 48,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 12,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
    },
    icon: {
        position: 'absolute',
        right: 15,
    },
});
