// import React from 'react';
// import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import { useFonts, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
// import { AntDesign } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { signOut } from "firebase/auth";
// import { auth } from '../firebaseConfig';

// export default function Profile({ route }) {
//     const { userInfo } = route.params;
//     const navigation = useNavigation();

//     const SignOut = () => {
//         signOut(auth).then(() => {
//             console.log('Signed Out');
//             navigation.replace('SignIn');
//         }).catch((error) => {
//             console.error('Sign Out Error', error);
//         });
//     }

//     const [fontsLoaded] = useFonts({
//         Poppins_700Bold,
//         Poppins_400Regular,
//     });

//     if (!fontsLoaded) {
//         return <Text>Loading...</Text>; // or any loading indicator
//     }

//     return (
//         <View style={styles.container}>
//             <View style={styles.headerContainer}>
//                 <View style={styles.circle} />
//                 <View style={styles.textContainer}>
//                     <Text style={styles.nameText}>{userInfo?.name || userInfo}</Text>
//                     <Text style={styles.subText}>School</Text>
//                 </View>
//             </View>
//             <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Classes')}>
//                 <Text style={styles.buttonText}>Classes</Text>
//                 <AntDesign name="right" size={15} color="black" style={styles.icon} />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sports')}>
//                 <Text style={styles.buttonText}>Athletics</Text>
//                 <AntDesign name="right" size={15} color="black" style={styles.icon} />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Portfolio')}>
//                 <Text style={styles.buttonText}>Portfolio**Delete When Done</Text>
//                 <AntDesign name="right" size={15} color="black" style={styles.icon} />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.button} onPress={() => SignOut()}>
//                 <Text style={styles.buttonText}>Sign Out</Text>
//                 <AntDesign name="right" size={15} color="black" style={styles.icon} />
//             </TouchableOpacity>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f7f7f7',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     headerContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 20,
//     },
//     circle: {
//         width: 80,
//         height: 80,
//         borderRadius: 40,
//         backgroundColor: '#0e0e0e',
//         marginLeft: -50,
//     },
//     textContainer: {
//         marginLeft: 20,
//     },
//     nameText: {
//         fontFamily: 'Poppins_700Bold',
//         fontSize: 25,
//     },
//     subText: {
//         fontFamily: 'Poppins_400Regular',
//         fontSize: 15,
//     },
//     buttonText: {
//         fontFamily: 'Poppins_400Regular',
//         fontSize: 15,
//         marginLeft: 10,
//         justifyContent: 'center',
//         textAlign: 'left',
//     },
//     button: {
//         marginTop: 50,
//         width: 335,
//         height: 48,
//         paddingHorizontal: 8,
//         borderWidth: 1,
//         borderColor: '#e3e3e3',
//         borderRadius: 12,
//         backgroundColor: '#ffffff',
//         justifyContent: 'center',
//     },
//     icon: {
//         position: 'absolute',
//         right: 15,
//     },
// });


import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signOut } from "firebase/auth";
import { auth } from '../firebaseConfig';
import Classes, { ClassCard } from './classes'; // Import the ClassCard component

export default function Profile({ route }) {
    const { userInfo } = route.params;
    const navigation = useNavigation();

    const SignOut = () => {
        signOut(auth).then(() => {
            console.log('Signed Out');
            navigation.replace('SignIn');
        }).catch((error) => {
            console.error('Sign Out Error', error);
        });
    }

    const [fontsLoaded] = useFonts({
        Poppins_700Bold,
        Poppins_400Regular,
        Poppins_600SemiBold,
    });

    if (!fontsLoaded) {
        return <Text>Loading...</Text>; // or any loading indicator
    }

    return (
        <View style={styles.container}>
            <Button title="Portfolio * Remove when done" onPress={() => navigation.navigate('Portfolio')} />
            <Text style={styles.headerText}>Your Classes</Text>
            <Classes />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    classContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: -45,
        backgroundColor: 'lightgray',
        width: 260,
        height: 180,
        borderRadius: 20,

    },
    headerText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 20,
        textAlign: 'left',
        left: 35
    },
});
