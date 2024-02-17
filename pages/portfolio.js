import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import athleticsData from '../components/portfolioData/athletics_data.json';

// Class Imports
import AllClasses from '../components/portfolioData/allClasses';
import englishClassesData from '../components/portfolioData/classes/english_classes.json';
import businessClassesData from '../components/portfolioData/classes/business_classes.json';

const Portfolio = ({ route }) => {
    console.log('English Classes Data:', englishClassesData);
    console.log('Business Classes Data:', businessClassesData);

    const allClasses = AllClasses();
    const { category } = route.params || { category: { data: [] } };
    const allData = [...allClasses, ...athleticsData];

    const [selectedTab, setSelectedTab] = useState('All');
    const [innerTab, setInnerTab] = useState('All');

    const [filteredData, setFilteredData] = useState(category.data);

    useEffect(() => {
        filterData();
    }, [selectedTab, innerTab, category]);

    const filterData = () => {
        if (selectedTab === 'All') {
            setFilteredData(allData);
        } else if (selectedTab === 'Classes') {
            const filtered = allClasses.filter(item => {
                console.log('Item Label:', item.label); // Log the label of each item
                console.log('Inner Tab:', innerTab);
                return innerTab === 'All' ? true : item.label === innerTab;
            });
            console.log('Filtered Data:', filtered);
            setFilteredData(filtered);
        } else if (selectedTab === 'Athletics') {
            setFilteredData(athleticsData);
        } else {
            setFilteredData(category.data);
        }
    };


    const handleTabSelect = (tab) => {
        setSelectedTab(tab);
        setInnerTab('All');
    };

    const handleClassTypeSelect = (tab) => {
        setInnerTab(tab);
    }

    const renderTabs = () => {
        const tabs = ['All', 'Classes', 'Athletics'];

        return tabs.map((type, index) => (
            <TouchableOpacity
                key={index.toString()}
                onPress={() => handleTabSelect(type)}
                style={{
                    padding: 10,
                    backgroundColor: selectedTab === type ? 'blue' : 'gray',
                    borderRadius: 8,
                    margin: 5,
                }}
            >
                <Text style={{ color: 'white' }}>{type}</Text>
            </TouchableOpacity>
        ));
    };

    const renderClassType = () => {
        if (selectedTab !== 'Classes') {
            return null;
        }

        const classTypes = ['All', 'English', 'Business'];

        return classTypes.map((type, index) => (
            <TouchableOpacity
                key={index.toString()}
                onPress={() => handleClassTypeSelect(type)}
                style={{
                    padding: 10,
                    backgroundColor: innerTab === type ? 'blue' : 'gray',
                    borderRadius: 8,
                    margin: 5,
                }}
            >
                <Text style={{ color: 'white' }}>{type}</Text>
            </TouchableOpacity>
        ));
    }

    const renderClassItem = () => {
        if (selectedTab === 'Classes') {
            switch (innerTab) {
                case 'English':
                    return (
                        <FlatList
                            data={englishClassesData}
                            renderItem={({ item }) => (
                                <View style={styles.filterData}>
                                    <Text>{item.label}</Text>
                                </View>
                            )}
                            keyExtractor={item => item.id.toString()}
                        />
                    );
                case 'Business':
                    return (
                        <FlatList
                            data={businessClassesData}
                            renderItem={({ item }) => (
                                <View style={styles.filterData}>
                                    <Text>{item.label}</Text>
                                </View>
                            )}
                            keyExtractor={item => item.id.toString()}
                        />
                    );
                default:
                    return null;
            }
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.filterData}>
            <Text>{item.label}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.filterContainer}>
                {renderTabs()}
            </View>

            <View style={styles.filterContainer}>
                {renderClassType()}
            </View>

            {selectedTab === 'Classes' ? renderClassItem() : null}

            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

export default Portfolio;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'center', // Center the buttons horizontally
        padding: 10,
        marginBottom: 20,
        backgroundColor: 'lightgray',
    },
    filterButton: {
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 8,
        margin: 5,
    },
    filterData: {
        padding: 20,
        backgroundColor: 'red',
        margin: 10,
    },
});