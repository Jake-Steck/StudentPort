import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signOut } from "firebase/auth";
import { auth } from '../firebaseConfig';
import Classes, { ClassCard } from './classes'; // Import the ClassCard component
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { addToPortfolio } from '../components/firestoreData';

export default function TestScores({ route }) {
    // const { userInfo } = route.params;
    const navigation = useNavigation();
    const [selectedTest, setSelectedTest] = useState("SAT");
    const [readingOrWriting, toggleReading] = useState("R");


    // SAT Scores3
    const [satEnglish, setSATEnglish] = useState(null);
    const [satMath, setSATMath] = useState(null);

    // ACT Scores
    const [actReading, setACTReading] = useState(null);
    const [actWriting, setACTWriting] = useState(null);
    const [actMath, setACTMath] = useState(null);
    const [actScience, setACTScience] = useState(null);

    // Composite Scores
    const [satComposite, setSATComposite] = useState(null);
    const [actComposite, setACTComposite] = useState(null);

    const [displayComposite, setDisplayComposite] = useState(0);

    function updateEnglish(t) {
        if (selectedTest == "ACT") {
            if (readingOrWriting == "R") {
                setACTReading(t);
            } else if (readingOrWriting == "W") {
                setACTWriting(t);
            }
        } else if (selectedTest == "SAT") {
            setSATEnglish(t);
        }
    }

    function updateMath(t) {
        if (selectedTest == "ACT") {
            setACTMath(t);
        } else {
            setSATMath(t);
        }
    }

    const keepValuesEnglish = () => {
        if (selectedTest == "ACT") {
            if (readingOrWriting === "R") {
                return actReading;
            } else {
                return actWriting;
            }
        } else {
            return satEnglish;
        }
    };

    const keepScience = () => {
        if (selectedTest == "SAT") {
            return 0;
        } else {
            return actScience;
        }
    }

    const keepValuesMath = () => {
        if (selectedTest == "ACT") {
            return actMath;
        } else {
            return satMath;
        }
    }

    function updateComposite() {
        if (selectedTest == "SAT") {
            // Ensure satEnglish and satMath are valid numbers
            const parsedSatEnglish = parseInt(satEnglish);
            const parsedSatMath = parseInt(satMath);

            if (!isNaN(parsedSatEnglish) && !isNaN(parsedSatMath)) {
                const satComposite = parsedSatEnglish + parsedSatMath;
                setSATComposite(satComposite);
                setDisplayComposite(String(satComposite));
                console.log("SAT Composite Score:", satComposite);
                addToPortfolio("SAT", "testing", satComposite);
            } else {
                alert("Invalid SAT Score")
                console.error("Invalid SAT scores");
            }
        } else if (selectedTest == "ACT") {
            // Ensure actMath, actReading, actWriting, and actScience are valid numbers
            const parsedActMath = parseInt(actMath);
            const parsedActReading = parseInt(actReading);
            const parsedActWriting = parseInt(actWriting);
            const parsedActScience = parseInt(actScience);

            if (!isNaN(parsedActMath) && !isNaN(parsedActReading) && !isNaN(parsedActWriting) && !isNaN(parsedActScience)) {
                const actComposite = Math.round((parsedActMath + parsedActReading + parsedActWriting + parsedActScience) / 4);
                setACTComposite(actComposite);
                setDisplayComposite(String(actComposite));
                addToPortfolio("ACT", "testing", actComposite);
                console.log("ACT Composite Score:", actComposite);

            } else {
                alert("Invalid ACT Score")
                console.error("Invalid ACT scores");
            }
        } else {
            alert("Invalid Test Type")
            console.error("Invalid test type");
        }
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
            <View style={styles.testselectorContainer}>
                <TouchableOpacity
                    style={[
                        styles.testButton,
                        selectedTest === 'SAT' && styles.selectedTestButton
                    ]}
                    onPress={() => setSelectedTest('SAT')}
                >
                    <Text
                        style={[
                            styles.testButtonText,
                            selectedTest === 'SAT' && styles.selectedTestButtonText
                        ]}
                    >
                        SAT
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.testButton,
                        selectedTest === 'ACT' && styles.selectedTestButton
                    ]}
                    onPress={() => setSelectedTest('ACT')}
                >
                    <Text
                        style={[
                            styles.testButtonText,
                            selectedTest === 'ACT' && styles.selectedTestButtonText
                        ]}
                    >
                        ACT
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputBoxes}>
                    <View style={styles.textFitter}>
                        <Text style={[
                            styles.iconText,
                            selectedTest == 'ACT' && readingOrWriting == "W" && styles.unselectedSection
                        ]} onPress={() => toggleReading("R")}>Reading</Text>
                        <Text style={styles.iconText}>/</Text>
                        <Text style={[
                            styles.iconText,
                            selectedTest == 'ACT' && readingOrWriting == "R" && styles.unselectedSection
                        ]} onPress={() => toggleReading("W")}>Writing</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder='Reading / Writing Score'
                        onChangeText={text => updateEnglish(text)}
                        maxLength={3} // Setting limit of input
                        value={keepValuesEnglish()} // Use the value returned by keepValues function
                    />
                </View>
                <View style={styles.inputBoxes}>
                    <Text style={styles.iconText}>Math</Text>
                    <TextInput
                        //onChangeText={text => setPassword(text)}
                        style={styles.input}
                        placeholder='Math Score'
                        onChangeText={text => updateMath(text)}
                        value={keepValuesMath()}
                    />
                </View>
                <View style={styles.inputBoxes}>
                    <Text style={
                        styles.iconText
                    }>Science</Text>
                    <TextInput
                        //onChangeText={text => setPassword(text)}
                        style={[
                            styles.input,
                            selectedTest == "SAT" && styles.blockedInput
                        ]}
                        placeholder='Science Score'
                        editable={selectedTest == "ACT" && true}
                        onChangeText={text => setACTScience(text)}
                        value={keepScience()}
                    />
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={updateComposite}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.compositeContainer}>
                <Text style={styles.compositeHeader}>Composite Score</Text>
                <Text style={styles.compositeScore}>{displayComposite}</Text>
            </View>
            <View style={styles.gap} />
            <TouchableOpacity>
                <Text style={styles.back} onPress={() => navigation.push('Profile')}>Back</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        top: 80,
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
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 20,
        textAlign: 'left',
        left: 35,
        fontWeight: 'bold',

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
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 16,
        marginLeft: 15,
        textAlign: 'left',
        color: 'black',
    },
    currGap: {
        paddingRight: 16,
    },
    currGapEnd: {
        paddingRight: 45,
    },
    testselectorContainer: {
        top: 15,
        alignSelf: 'center',
        width: 350,
        height: 50,
        backgroundColor: "lightgray",
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 24,
        justifyContent: 'center',
    },
    testButton: {
        paddingHorizontal: "18%",
        paddingVertical: 7,
        backgroundColor: '#c1c0c8',
        borderRadius: 24,
        marginHorizontal: 5,
    },
    selectedTestButton: {
        backgroundColor: '#262626', // Change to the color you want for selected button

    },
    selectedTestButtonText: {
        color: 'white', // Change to the color you want for selected button text
        fontFamily: 'Poppins_600SemiBold',
    },
    submitButtonText: {
        color: 'black',
        fontFamily: 'Poppins_600SemiBold',
    },
    testButtonText: {
        color: "#030303",
        fontFamily: 'Poppins_600SemiBold',
    },
    inputContainer: {
        marginTop: 30,
        backgroundColor: "lightgray",
        height: 340,
        width: 360,
        borderRadius: 24,
        alignSelf: 'center',
        alignItems: 'center',
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
        //fontFamily: 'Poppins_300Light',
        lineHeight: 22,
    },
    inputBoxes: {
        marginTop: 10
    },
    textFitter: {
        flexDirection: 'row',
    },
    unselectedSection: {
        color: "#85848a",
    },
    blockedInput: {
        backgroundColor: "#c2c2c2",
    },
    compositeContainer: {
        top: 12,
        alignSelf: 'center',
        backgroundColor: "lightgray",
        height: 100,
        width: 350,
        borderRadius: 20,
    },
    compositeHeader: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 18,
        marginLeft: 15,
        marginTop: 5,
    },
    compositeScore: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 32,
        marginLeft: 18,
        marginTop: 5,
    },
    submitButton: {
        marginTop: 14,
        width: 150,
        height: 48,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: '#0e0e0e',
        borderRadius: 12,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statsContainer: {
        height: 175,
        width: 350,
        backgroundColor: "lightgray",
        borderRadius: 24,
        alignSelf: 'center',
        top: 25,
    },
    back: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 18,
        textAlign: 'center',
        top: 40,
        color: 'black',
    },
});