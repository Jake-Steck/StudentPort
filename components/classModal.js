// ClassModal.js
import React from 'react';
import { View, Text, Modal, Button, StyleSheet } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { getUser, getUserPortfolioID, addToPortfolio, getClasses, getSports, removeFromPortfolio } from './firestoreData';
import { useEffect } from 'react';

const ClassModal = ({ isVisible, onClose, item }) => {

    console.log('Item:', item);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text>Class Modal Content</Text>
                    <Button title="Close" onPress={onClose} />
                    <Button title="Add to Portfolio" onPress={() => addToPortfolio(item, "classes")} />
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
});

export default ClassModal;
