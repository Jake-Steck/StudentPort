import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Modal,
    ScrollView,
} from 'react-native';
import {
    useFonts,
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

// User Imports
import { auth, database } from '../firebaseConfig';
import {
    getUser,
    getUserPortfolioID,
    addToPortfolio,
    getClasses,
    getSports,
} from '../components/firestoreData';

// Data Imports
import athleticsData from '../components/portfolioData/athletics_data.json';
import clubsData from '../components/portfolioData/clubs_data.json';
import serviceData from '../components/portfolioData/service_data.json';
import testingData from '../components/portfolioData/testing_data.json';

// Class Imports
import AllClasses from '../components/portfolioData/allClasses';
import englishClassesData from '../components/portfolioData/classes/english_classes.json';
import businessClassesData from '../components/portfolioData/classes/business_classes.json';
import mathClassesData from '../components/portfolioData/classes/math_classes.json';
import scienceClassesData from '../components/portfolioData/classes/science_classes.json';
import socialStudiesClassesData from '../components/portfolioData/classes/social_classes.json';
import worldLanguageClassesData from '../components/portfolioData/classes/language_classes.json';
import consumerClassesData from '../components/portfolioData/classes/consumer_classes.json';
import technologyClassesData from '../components/portfolioData/classes/technology_classes.json';
import artClassesData from '../components/portfolioData/classes/art_classes.json';

// Modal Imports
import ClassModal from '../components/classModal';
import AthleticModal from '../components/athleticModal';
import ClubModal from '../components/clubModal';
import ServiceModal from '../components/serviceModal';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Portfolio = ({ route }) => {
    const [fontsLoaded] = useFonts({
        Poppins_700Bold,
        Poppins_400Regular,
        Poppins_600SemiBold,
    });

    const allClasses = AllClasses();
    const { category } = route.params || { category: { data: [] } };
    const allData = [...allClasses, ...athleticsData, ...clubsData, ...serviceData];

    const [selectedTab, setSelectedTab] = useState('All');
    const [innerTab, setInnerTab] = useState('All');

    const [filteredData, setFilteredData] = useState(category.data);

    const [classModalVisible, setClassModalVisible] = useState({
        visible: false,
        item: null,
    });
    const [athleticModalVisible, setAthleticModalVisible] = useState({
        visible: false,
        item: null,
    });

    const [clubModalVisible, setClubModalVisible] = useState({
        visible: false,
        item: null,
    });

    const [serviceModalVisible, setServiceModalVisible] = useState({
        visible: false,
        item: null,
    });

    const navigation = useNavigation();

    useEffect(() => {
        filterData();
    }, [selectedTab, innerTab, category]);

    const filterData = () => {
        if (selectedTab === 'All') {
            setFilteredData(allData);
        } else if (selectedTab === 'Classes') {
            const filtered = allClasses.filter((item) => {
                return innerTab === 'All' ? true : item.label === innerTab;
            });
            console.log('Filtered Data:', filtered);
            setFilteredData(filtered);
        } else if (selectedTab === 'Athletics') {
            setFilteredData(athleticsData);
        } else if (selectedTab === 'Clubs') {
            setFilteredData(clubsData);
        } else if (selectedTab === 'Service') {
            setFilteredData(serviceData);
        } else if (selectedTab === 'Testing') {
            setFilteredData(testingData);
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
        } else if (item.type === 'Clubs') {
            setClubModalVisible({ visible: true, item: item.label });
        } else if (item.type === 'Service') {
            setServiceModalVisible({ visible: true, item: item.label });
        } else if (item.type === 'Testing') {
            navigation.push('TestScores');
        }
    };

    const handleModalClose = () => {
        setClassModalVisible({ visible: false, item: null });
        setAthleticModalVisible({ visible: false, item: null });
        setClubModalVisible({ visible: false, item: null });
        setServiceModalVisible({ visible: false, item: null });
    };

    const handleTabSelect = (tab) => {
        setSelectedTab(tab);
        setInnerTab('All');
    };

    const handleClassTypeSelect = (tab) => {
        setInnerTab(tab);
    };

    const renderTabs = () => {
        const tabs = ['All', 'Classes', 'Athletics', 'Clubs', 'Service', 'Testing'];

        return tabs.map((type, index) => (

            <TouchableOpacity
                key={index.toString()}
                onPress={() => handleTabSelect(type)}
                style={[
                    styles.filterButton,
                    selectedTab === type && styles.selectedFilter,
                ]}
            >
                <Text style={styles.filterButtonText}>{type}</Text>
            </TouchableOpacity>
        ));
    };

    const renderClassType = () => {
        if (selectedTab !== 'Classes') {
            return null;
        }

        const classTypes = [
            'All',
            'English',
            'Business',
            'Math',
            'Science',
            'Social Studies',
            'Arts',
            'Technology',
            'Language',
            'Consumer Sciences',
        ];

        const buttons = classTypes.map((type, index) => (
            <TouchableOpacity
                key={index.toString()}
                onPress={() => handleClassTypeSelect(type)}
                style={[
                    styles.filterButton,
                    innerTab === type && styles.selectedFilter,
                ]}
            >
                <Text style={styles.filterButtonText}>{type}</Text>
            </TouchableOpacity>
        ));

        const rows = [];
        for (let i = 0; i < buttons.length; i += 3) {
            rows.push(
                <View key={i} style={{ flexDirection: 'row', flex: 1 }}>
                    {buttons.slice(i, i + 3)}
                </View>
            );
        }

        return (
            <ScrollView
                horizontal
                contentContainerStyle={styles.filterContainer}
            >
                {rows}
            </ScrollView>
        );
    };


    const renderClassItem = () => {
        if (selectedTab === 'Classes') {
            switch (innerTab) {
                case 'English':
                    return (
                        <FlatList
                            data={englishClassesData}
                            renderItem={({ item }) => (
                                <View style={styles.filterData}>
                                    <TouchableOpacity
                                        onPress={() => handleItemPress(item)}
                                    >
                                        <Text style={styles.filterDataText}>{item.label}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    );
                case 'Business':
                    return (
                        <FlatList
                            data={businessClassesData}
                            renderItem={({ item }) => (
                                <View style={styles.filterData}>
                                    <TouchableOpacity
                                        onPress={() => handleItemPress(item)}
                                    >
                                        <Text style={styles.filterDataText}>{item.label}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    );
                case 'Math':
                    return (
                        <FlatList
                            data={mathClassesData}
                            renderItem={({ item }) => (
                                <View style={styles.filterData}>
                                    <TouchableOpacity
                                        onPress={() => handleItemPress(item)}
                                    >
                                        <Text style={styles.filterDataText}>{item.label}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    );
                case 'Science':
                    return (
                        <FlatList
                            data={scienceClassesData}
                            renderItem={({ item }) => (
                                <View style={styles.filterData}>
                                    <TouchableOpacity
                                        onPress={() => handleItemPress(item)}
                                    >
                                        <Text style={styles.filterDataText}>{item.label}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    );
                case 'Social Studies':
                    return (
                        <FlatList
                            data={socialStudiesClassesData}
                            renderItem={({ item }) => (
                                <View style={styles.filterData}>
                                    <TouchableOpacity
                                        onPress={() => handleItemPress(item)}
                                    >
                                        <Text style={styles.filterDataText}>{item.label}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    );
                case 'Arts':
                    return (
                        <FlatList
                            data={artClassesData}
                            renderItem={({ item }) => (
                                <View style={styles.filterData}>
                                    <TouchableOpacity
                                        onPress={() => handleItemPress(item)}
                                    >
                                        <Text style={styles.filterDataText}>{item.label}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    );
                case 'Technology':
                    return (
                        <FlatList
                            data={technologyClassesData}
                            renderItem={({ item }) => (
                                <View style={styles.filterData}>
                                    <TouchableOpacity
                                        onPress={() => handleItemPress(item)}
                                    >
                                        <Text style={styles.filterDataText}>{item.label}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    );
                case 'Language':
                    return (
                        <FlatList
                            data={worldLanguageClassesData}
                            renderItem={({ item }) => (
                                <View style={styles.filterData}>
                                    <TouchableOpacity
                                        onPress={() => handleItemPress(item)}
                                    >
                                        <Text style={styles.filterDataText}>{item.label}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    );
                case 'Consumer Sciences':
                    return (
                        <FlatList
                            data={consumerClassesData}
                            renderItem={({ item }) => (
                                <View style={styles.filterData}>
                                    <TouchableOpacity
                                        onPress={() => handleItemPress(item)}
                                    >
                                        <Text style={styles.filterDataText}>{item.label}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            keyExtractor={(item) => item.id.toString()}
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
            <View style={styles.textContainer}>
                <Text style={styles.heading}>Portfolio</Text>
                <Ionicons style={styles.profile} name="person-circle-sharp" size={50} color="black" onPress={() => navigation.push("Profile")} />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.filterContainer}>
                    {renderTabs()}
                </View>
            </ScrollView>

            {renderClassType()}

            {selectedTab === 'Classes' ? renderClassItem() : null}

            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                keyboardShouldPersistTaps="always"
            />

            <ClassModal
                isVisible={classModalVisible.visible}
                onClose={handleModalClose}
                item={classModalVisible.item}
            />
            <AthleticModal
                isVisible={athleticModalVisible.visible}
                onClose={handleModalClose}
                item={athleticModalVisible.item}
            />
            <ClubModal
                isVisible={clubModalVisible.visible}
                onClose={handleModalClose}
                item={clubModalVisible.item}
            />
            <ServiceModal
                isVisible={serviceModalVisible.visible}
                onClose={handleModalClose}
                item={serviceModalVisible.item}
            />
        </View>
    );
};

export default Portfolio;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 15,
        top: 50,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        marginBottom: 20,
        backgroundColor: '#3498db',
        borderRadius: 10,
        height: 60,
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
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 10,
    },

    heading: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 25,
    },
});
