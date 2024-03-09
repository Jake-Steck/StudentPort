import englishClassesData from './classes/english_classes.json';
import businessClassesData from './classes/business_classes.json';
import artClassesData from './classes/art_classes.json';
import mathClassesData from './classes/math_classes.json';
import scienceClassesData from './classes/science_classes.json';
import socialStudiesClassesData from './classes/social_classes.json';
import worldLanguageClassesData from './classes/language_classes.json';
import consumerClassesData from './classes/consumer_classes.json';
import technologyClassesData from './classes/technology_classes.json';

const AllClasses = () => {
    const combinedData = [
        ...englishClassesData,
        ...businessClassesData,
        ...artClassesData,
        ...mathClassesData,
        ...scienceClassesData,
        ...socialStudiesClassesData,
        ...worldLanguageClassesData,
        ...consumerClassesData,
        ...technologyClassesData,
    ];
    return combinedData;
};

export default AllClasses;
