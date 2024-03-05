import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

// User Imports
import { auth, database } from '../firebaseConfig';
import { getUser, getUserPortfolioID, addToPortfolio, getClasses, getSports } from '../components/firestoreData';


// Data Imports
import athleticsData from '../components/portfolioData/athletics_data.json';

// Class Imports
import AllClasses from '../components/portfolioData/allClasses';
import englishClassesData from '../components/portfolioData/classes/english_classes.json';
import businessClassesData from '../components/portfolioData/classes/business_classes.json';

// Modal Imports
import ClassModal from '../components/classModal';
import AthleticModal from '../components/athleticModal';

const Portfolio = ({ route }) => {

    const [fontsLoaded] = useFonts({
        Poppins_700Bold,
        Poppins_400Regular,
        Poppins_600SemiBold,
    });

    const allClasses = AllClasses();
    const { category } = route.params || { category: { data: [] } };
    const allData = [...allClasses, ...athleticsData];

    const [selectedTab, setSelectedTab] = useState('All');
    const [innerTab, setInnerTab] = useState('All');

    const [filteredData, setFilteredData] = useState(category.data);

    const [classModalVisible, setClassModalVisible] = useState({ visible: false, item: null });
    const [athleticModalVisible, setAthleticModalVisible] = useState({ visible: false, item: null });


    useEffect(() => {
        filterData();
    }, [selectedTab, innerTab, category]);



    const filterData = () => {
        if (selectedTab === 'All') {
            setFilteredData(allData);
        } else if (selectedTab === 'Classes') {
            const filtered = allClasses.filter(item => {
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



    const handleItemPress = (item) => {
        console.log('Item Pressed:', item);
        if (item.type === 'Classes') {
            setClassModalVisible({ visible: true, item: item.label });
        } else if (item.type === 'Athletics') {
            setAthleticModalVisible({ visible: true, item: item.label });
        }
    }

    const handleModalClose = () => {
        setClassModalVisible({ visible: false, item: null });
        setAthleticModalVisible({ visible: false, item: null });
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
                style={[styles.filterButton, selectedTab === type && styles.selectedFilter]}
            >
                <Text style={styles.filterButtonText}>{type}</Text>
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
                style={[styles.filterButton, innerTab === type && styles.selectedFilter]}
            >
                <Text style={styles.filterButtonText}>{type}</Text>
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
                                    <TouchableOpacity onPress={() => handleItemPress(item)}>
                                        <Text style={styles.filterDataText}>{item.label}</Text>
                                    </TouchableOpacity>
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
                                    <TouchableOpacity onPress={() => handleItemPress(item)}>
                                        <Text style={styles.filterDataText}>{item.label}</Text>
                                    </TouchableOpacity>
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
        <TouchableOpacity onPress={() => handleItemPress(item)}>
            <View style={styles.filterData}>
                <Text style={styles.filterDataText}>{item.label}</Text>
            </View>
        </TouchableOpacity>
    );

    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }


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

            <ClassModal isVisible={classModalVisible.visible} onClose={handleModalClose} item={classModalVisible.item} />
            <AthleticModal isVisible={athleticModalVisible.visible} onClose={handleModalClose} item={athleticModalVisible.item} />
        </View>
    );
}

export default Portfolio;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 15,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        marginBottom: 20,
        backgroundColor: '#3498db',
        borderRadius: 10,
    },
    filterButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#2980b9',
        borderRadius: 8,
        marginHorizontal: 5,
    },
    filterButtonText: {
        color: '#ecf0f1',
        fontFamily: 'Poppins_600SemiBold',
    },
    filterData: {
        padding: 15,
        borderRadius: 8,
        borderWidth: 2,
        marginVertical: 3,
        borderColor: 'black',
    },
    filterDataText: {
        color: '#2c3e50',
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
    },
    selectedFilter: {
        backgroundColor: '#1c5c85',
    }
});

