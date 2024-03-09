import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { addToPortfolio } from './firestoreData';

const ServiceModal = ({ isVisible, onClose, item }) => {
    const [selectedLevel, setSelectedLevel] = useState('');
    const [hours, setHours] = useState('');

    const handleAddToPortfolio = () => {
        addToPortfolio(item, "service", hours);
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text>{item}</Text>
                    <Text>Enter number of hours:</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={hours}
                        onChangeText={(text) => setHours(text)}
                    />
                    <View style={styles.bottomContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.addToPortfolioButton]}
                            onPress={handleAddToPortfolio}
                        >
                            <Text style={{ color: 'white' }}>Add to Portfolio</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.closeButton]}
                            onPress={onClose}
                        >
                            <Text style={{ color: 'white' }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'gray',
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    closeButton: {
        backgroundColor: 'tomato',
    },
    addToPortfolioButton: {
        backgroundColor: 'mediumseagreen',
    },
    selectedButton: {
        backgroundColor: 'lightblue',
    },
});

export default ServiceModal;
