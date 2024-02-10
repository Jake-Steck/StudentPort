import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import data from '../data.json';

const Portfolio = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const renderCategory = (category) => {
        return (
            <TouchableOpacity onPress={() => setSelectedCategory(category)}>
                <Text style={selectedCategory === category ? styles.activeCategory : styles.category}>{category}</Text>
            </TouchableOpacity>
        );
    };

    const getCategoryData = () => {
        if (selectedCategory === 'All') {
            return [...data.classes, ...data.athletics];
        } else if (selectedCategory === 'Classes') {
            return data.classes;
        } else if (selectedCategory === 'Athletics') {
            return data.athletics;
        }
        // Add more categories as needed
    };

    return (
        <View style={styles.container}>
            <View style={styles.categories}>
                {renderCategory('All')}
                {renderCategory('Classes')}
                {renderCategory('Athletics')}
                {/* Add more categories as needed */}
            </View>
            <FlatList
                data={getCategoryData()}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.name}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    categories: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    category: {
        fontSize: 16,
        color: 'black',
    },
    activeCategory: {
        fontSize: 16,
        color: 'blue',
    },
    item: {
        backgroundColor: 'lightgray',
        padding: 20,
        marginVertical: 3,
    },
});

export default Portfolio;
