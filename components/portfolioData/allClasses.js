import englishClassesData from './classes/english_classes.json';
import businessClassesData from './classes/business_classes.json';

const AllClasses = () => {
    const combinedData = [...englishClassesData, ...businessClassesData];
    return combinedData;
};

export default AllClasses;
