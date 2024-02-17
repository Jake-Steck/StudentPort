import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
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
    const [innerTab, setInnerTab] = useState('All'); // State for inner tabs

    const [filteredData, setFilteredData] = useState(category.data);

    useEffect(() => {
        filterData();
    }, [selectedTab, innerTab, category]);

    const filterData = () => {
        console.log('innerTab:', innerTab);
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
        } else {
            const filtered = category.data.filter(item => item.label === selectedTab);
            console.log('Filtered Data:', filtered);
            setFilteredData(filtered);
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
        if (selectedTab !== 'Classes') {
            return null;
        } else if (innerTab === 'English') {

            return (
                <FlatList
                    data={englishClassesData}
                    renderItem={({ item }) => (
                        <View style={{ padding: 20 }}>
                            <Text>{item.label}</Text>
                        </View>
                    )}
                    keyExtractor={item => item.id.toString()}
                />
            );
        } else if (innerTab === 'Business') {
            return (
                <FlatList
                    data={businessClassesData}
                    renderItem={({ item }) => (
                        <View style={{ padding: 20 }}>
                            <Text>{item.label}</Text>
                        </View>
                    )}
                    keyExtractor={item => item.id.toString()}
                />
            );
        }
    }

    const renderItem = ({ item }) => (
        <View style={{ padding: 20 }}>
            <Text>{item.label}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                {renderTabs()}
            </View>

            <View style={{ flexDirection: 'row' }}>
                {renderClassType()}
                {renderClassItem()}
                <FlatList
                    data={filteredData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}  // Convert to string
                />
            </View>
        </View>
    );
};

export default Portfolio;
