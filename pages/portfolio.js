import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import data from '../data.json';
import ClassesModal from '../components/classModal';
import AthleticsModal from '../components/athleticModal';

const Portfolio = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedType, setSelectedType] = useState('All');
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const renderCategory = (category) => {
        return (
            <TouchableOpacity onPress={() => handleCategoryClick(category)}>
                <Text style={selectedCategory === category ? styles.activeCategory : styles.category}>{category}</Text>
            </TouchableOpacity>
        );
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setSelectedItem(null); // Reset selectedItem when a category is clicked

    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const renderType = (type) => {
        return (
            <TouchableOpacity onPress={() => setSelectedType(type)}>
                <Text style={selectedType === type ? styles.activeCategory : styles.category}>{type}</Text>
            </TouchableOpacity>
        );
    };

    const getFilteredData = () => {
        if (selectedCategory === 'All') {
            return data.items;
        } else {
            const categoryData = data.items.filter(item => item.category === selectedCategory);

            if (selectedType === 'All') {
                return categoryData;
            } else {
                return categoryData.filter(item => item.type === selectedType);
            }
        }
    };

    const renderTypeButtons = () => {
        if (selectedCategory !== 'All' && data.items.some(item => item.category === selectedCategory)) {
            const uniqueTypes = [...new Set(data.items.filter(item => item.category === selectedCategory).map(item => item.type))];
            return (
                <View style={styles.types}>
                    {renderType('All')}
                    {uniqueTypes.map(type => renderType(type))}
                </View>
            );
        }
        return null;
    };

    const renderItemModal = () => {
        if (selectedItem && isModalVisible) {
            console.log(selectedItem.category)
            if (selectedCategory === 'All') {
                if (selectedItem.category === 'Classes') {
                    return <ClassesModal item={selectedItem} isVisible={isModalVisible} onClose={closeModal} />;
                } else if (selectedItem.category === 'Athletics') {
                    return <AthleticsModal item={selectedItem} isVisible={isModalVisible} onClose={closeModal} />;
                }
            } else if (selectedCategory === 'Classes') {
                return <ClassesModal item={selectedItem} isVisible={isModalVisible} onClose={closeModal} />;
            } else if (selectedCategory === 'Athletics') {
                return <AthleticsModal item={selectedItem} isVisible={isModalVisible} onClose={closeModal} />;
            }
        }
        return null;
    };


    return (
        <View style={styles.container}>
            <View style={styles.categories}>
                {renderCategory('All')}
                {renderCategory('Classes')}
                {renderCategory('Athletics')}
            </View>

            {renderTypeButtons()}

            <FlatList
                data={getFilteredData()}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => { setSelectedItem(item); toggleModal(); }}>
                        <View style={styles.item}>
                            <Text>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

            {renderItemModal()}
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
    types: {
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
