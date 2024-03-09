import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { addToPortfolio } from './firestoreData';

const ClubModal = ({ isVisible, onClose, item }) => {
    const [selectedLevel, setSelectedLevel] = useState('');

    const handleAddToPortfolio = () => {
        addToPortfolio(item, "clubs", selectedLevel);
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
                    <Text>Please select the class level:</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, selectedLevel === 'Member' && styles.selectedButton]}
                            onPress={() => setSelectedLevel('Member')}
                        >
                            <Text>Member</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, selectedLevel === 'Leadership' && styles.selectedButton]}
                            onPress={() => setSelectedLevel('Leadership')}
                        >
                            <Text>Leadership</Text>
                        </TouchableOpacity>
                    </View>
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

export default ClubModal;
